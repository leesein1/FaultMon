// FaultController.cs
using Microsoft.AspNetCore.Mvc;
using Fault_Web.Models.Service;
using System.Data;
using Fault_Web.Hubs;
using Newtonsoft.Json;

namespace Fault_Web.Controllers
{
    public class FaultController : Controller
    {
        private readonly ILogger<FaultController> _logger;
        private readonly FaultService _service;
        private readonly IConfiguration _configuration;
        private readonly SignalRChat _chat;

        public FaultController(ILogger<FaultController> logger, FaultService service, IConfiguration configuration)
        {
            _logger = logger;
            _service = service; // ✅ DI로 주입된 걸 그대로 사용
            _configuration = configuration;
        }


        // 250513 silee - 실시간 고장 이력 API
        [HttpGet("/Fault/GetFaultList")]
        public IActionResult GetFaultList()
        {
            DataTable dt = _service.GetFaultList();

            string jsonString = JsonConvert.SerializeObject(dt); // ← 핵심

            return Content(jsonString, "application/json");
        }
    }
}
