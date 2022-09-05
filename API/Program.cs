using API.Infrastructure.Logging;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace API {

    public static class Program {

        public static void Main(string[] args) {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) {
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => {
                    webBuilder.UseStartup<Startup>();
                })
                .ConfigureLogging((context, logging) => {
                    logging.FileLogger(options => {
                        context.Configuration.GetSection("Logging").GetSection("File").GetSection("Options").Bind(options);
                    });
                });

        }

    }

}