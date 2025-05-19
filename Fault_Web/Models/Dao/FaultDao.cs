using Fault_Web.Models.Common;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Fault_Web.Models.Dao
{
    public class FaultDao
    {
        private readonly DBHelper _dbHelper;
        private readonly IConfiguration _configuration;

        public FaultDao(DBHelper dbHelper, IConfiguration configuration)
        {
            _dbHelper = dbHelper;
            _configuration = configuration;
        }

        public DataTable GetFaultList()
        {
            DataTable dt = new DataTable();

            using (var conn = _dbHelper.GetFLTConnection())
            {
                conn.Open();
                using (var cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    string queryString = @"exec [PROC_RECENT_FAULT_LIST]";
                    cmd.CommandText = queryString;
                    dt.Load(cmd.ExecuteReader());
                }
            }
            return dt;

        }

        public DataTable GetStatToday()
        {
            DataTable dt = new DataTable();

            using (var conn = _dbHelper.GetFLTConnection())
            {
                conn.Open();
                using (var cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    string queryString = @"exec [PROC_FAULT_STATS_TODAY]";
                    cmd.CommandText = queryString;
                    dt.Load(cmd.ExecuteReader());
                }
            }
            return dt;

        }
    }
}
