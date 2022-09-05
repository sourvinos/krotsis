using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace API {

    public static class Program {

        public static void Main(string[] args) {
            Log.Logger = new LoggerConfiguration()
                .WriteTo
                    .File("Logs/log.txt",
                        restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Information,
                        rollingInterval: RollingInterval.Day)
                .WriteTo
                    .File("Logs/errorlog.txt",
                        restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Warning,
                        rollingInterval: RollingInterval.Day)
                .WriteTo
                    .Console()
                    .CreateLogger();
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) {
            return Host.CreateDefaultBuilder(args)
                .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder => {
                    webBuilder.UseStartup<Startup>();
                });
        }

    }

}