using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace Krotsis {

    public class Startup {

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services) {
            // Static
            Extensions.AddCors(services);
            Extensions.AddInterfaces(services);
            Extensions.AddValidation(services);
            // Base
            services.AddAutoMapper(typeof(Startup));
            services.AddDbContextFactory<DbContext>(options => options.UseMySql(Configuration.GetConnectionString("LocalConnection"), new MySqlServerVersion(new Version(8, 0, 19))));
            services.AddControllersWithViews().AddFluentValidation();
            services.AddDbContext<DbContext>();
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/dist"; });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseSpaStaticFiles();
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseStaticFiles();
            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseStatusCodePages();
            app.UseHttpsRedirection();
            app.UseEndpoints(endpoints => {
                endpoints.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");
            });
            app.UseSpa(spa => {
                if (env.IsDevelopment()) {
                    spa.Options.SourcePath = "ClientApp";
                    spa.Options.StartupTimeout = new TimeSpan(days: 0, hours: 0, minutes: 15, seconds: 0);
                    spa.UseAngularCliServer(npmScript: "start");
                } else {
                    spa.Options.SourcePath = "dist";
                }
            });

        }

    }

}
