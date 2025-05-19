using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Fault_Web.Models.Common

{
    public class DBHelper
    {
        private readonly IConfiguration _configuration;

        public DBHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public SqlConnection connection { get; set; }

        public SqlConnection GetFLTConnection()
        {

            string connectionString = "";
            connectionString = _configuration.GetConnectionString("DefaultConnection");

            if (connection != null)
            {
                return connection;
            }
            else
            {
                return new SqlConnection(connectionString);
            }
        }

    }
}
