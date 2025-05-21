using Fault_Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Fault_Web.Controllers
{
    [Route("/")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        // �⺻ ��Ʈ: "/"
        [HttpGet("index")]
        public IActionResult Index()
        {
            return View();
        }

        // "/index2"�� ���� ���� ����
        [HttpGet("index2")]
        [HttpGet("")]
        public IActionResult Index2()
        {
            return View();
        }

        // "/privacy"�� ���� ���� ����
        [HttpGet("privacy")]
        public IActionResult Privacy()
        {
            return View();
        }

        // "/error"�� ���� ���� ����
        [HttpGet("error")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
 