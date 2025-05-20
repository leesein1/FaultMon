using System.Data;
using Fault_Web.Controllers;
using Fault_Web.Models.Common;
using Fault_Web.Models.Dao;
using Microsoft.Data.SqlClient;

namespace Fault_Web.Models.Service
{
    public class FaultService
    {
        private readonly DBHelper _dbHelper;
        private readonly IConfiguration _configuration;
        private readonly FaultDao _dao;

        public FaultService(DBHelper dbHelper, IConfiguration configuration, FaultDao faultDao)
        {
            _dbHelper = dbHelper;
            _configuration = configuration;
            _dao = faultDao;
        }

        public DataTable GetFaultList()
        {

            DataTable dt = _dao.GetFaultList();

            return dt;
        }

        public DataTable GetStatToday()
        {

            DataTable dt = _dao.GetStatToday();

            return dt;
        }

        public DataTable GetFaultListDetail(int IncidentID)
        {
            DataTable dt = _dao.GetFaultListDetail(IncidentID);

            return dt;
        }



    }
}
