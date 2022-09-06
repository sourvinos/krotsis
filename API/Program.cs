using API.Features.Items;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using Serilog.Filters;

namespace API {

    public static class Program {

        public static void Main(string[] args) {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .WriteTo.Logger(x => x.MinimumLevel.Verbose()
                    .WriteTo.Logger(x => x
                        .WriteTo.Logger(x => x
                            .Filter.ByIncludingOnly(Matching.FromSource<ItemsController>())
                            .MinimumLevel.Verbose()
                            .WriteTo.File("Logs/log.txt",
                                restrictedToMinimumLevel: LogEventLevel.Information,
                                rollingInterval: RollingInterval.Day))
                    ))
                .WriteTo.Console()
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