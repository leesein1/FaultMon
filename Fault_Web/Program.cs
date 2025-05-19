using Microsoft.Data.SqlClient; // SqlDependency 사용
using Fault_Web.Hubs;
using Fault_Web.Models.Service;
using Fault_Web.Models.Common;
using Fault_Web.Models.Dao;
using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);

// ✅ 서비스 등록
builder.Services.AddScoped<DBHelper>();
builder.Services.AddScoped<FaultService>();
builder.Services.AddScoped<FaultDao>();

builder.Services.AddControllersWithViews();
builder.Services.AddSignalR();

var app = builder.Build();

// ✅ 여기 이 한 줄 추가!!
SignalRChat.HubContext = app.Services.GetRequiredService<IHubContext<SignalRChat>>();

// ✅ SqlDependency 초기화
SqlDependency.Start(builder.Configuration.GetConnectionString("DefaultConnection"));

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapHub<SignalRChat>("/SignalRChat");

app.Run();
