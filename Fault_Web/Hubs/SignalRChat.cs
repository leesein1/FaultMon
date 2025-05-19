using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Fault_Web.Hubs
{
    public class SignalRChat : Hub
    {
        private readonly string _connectionString;
        private readonly ILogger<SignalRChat> _logger;
        private static SqlDependency? sqlDependency; // 🔹 단 하나만 유지
        public static IHubContext<SignalRChat>? HubContext; // 🔹 정적 HubContext (Program.cs에서 주입됨)

        public SignalRChat(IConfiguration configuration, ILogger<SignalRChat> logger)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            _logger = logger;
        }

        // 기본 채팅 메서드 (사용 안해도 됨)
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        // 클라이언트에서 최초 연결 후 호출하는 메서드
        public async Task GetAll()
        {
            try
            {
                if (sqlDependency != null)
                {
                    _logger.LogInformation("[SignalR] SqlDependency 이미 등록되어 있음. 중복 등록 방지.");
                    return;
                }

                string sql = "SELECT [IncidentID] FROM [dbo].[RcvFault]";
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand(sql, conn))
                {
                    await conn.OpenAsync();

                    cmd.Notification = null;
                    sqlDependency = new SqlDependency(cmd);
                    sqlDependency.OnChange += Dependency_OnChange;

                    using (SqlDataReader rdr = await cmd.ExecuteReaderAsync()) { }
                }

                _logger.LogInformation("[SignalR] SqlDependency 감시 등록 성공");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[SignalR] SqlDependency 감시 등록 실패");
                throw;
            }
        }


        // DB 변경 시 호출되는 콜백
        private void Dependency_OnChange(object sender, SqlNotificationEventArgs e)
        {
            // 이전 이벤트 제거
            SqlDependency dependency = (SqlDependency)sender;
            dependency.OnChange -= Dependency_OnChange;

            // sqlDependency도 제거
            if (sqlDependency != null)
            {
                sqlDependency.OnChange -= Dependency_OnChange;
                sqlDependency = null;
            }

            _logger.LogInformation("[SignalR] OnChange 발생: Type={Type}, Info={Info}, Source={Source}", e.Type, e.Info, e.Source);

            if (e.Type == SqlNotificationType.Change)
            {
                // 클라이언트에게 메시지 전송
                HubContext?.Clients.All.SendAsync("Signal_FLTLIST", "Database has been updated");

                // 다시 감시 등록
                _ = RegisterSqlDependency();
            }
        }

        // DB 감시 재등록
        private async Task RegisterSqlDependency()
        {
            string sql = "SELECT [IncidentID] FROM [dbo].[RcvFault]";

            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(sql, conn))
            {
                await conn.OpenAsync();
                cmd.Notification = null;

                if (sqlDependency != null)
                {
                    sqlDependency.OnChange -= Dependency_OnChange;
                    sqlDependency = null;
                }

                sqlDependency = new SqlDependency(cmd);
                sqlDependency.OnChange += Dependency_OnChange;

                using (SqlDataReader rdr = await cmd.ExecuteReaderAsync())
                {
                         // 감시만 수행
                }
            }

            _logger.LogInformation("[SignalR] SqlDependency 재등록 완료");
        }
    }
}
