using System;
using API.Infrastructure.Auth;
using API.Infrastructure.Classes;
using API.Infrastructure.Email;
using API.Infrastructure.Extensions;
using API.Infrastructure.Responses;
using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

// dotnet watch run --environment LocalDevelopment
// dotnet publish /p:Configuration=Release /p:EnvironmentName=LocalProduction

namespace API {

    public class Startup {

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment environment) {
            Configuration = configuration;
            Environment = environment;
        }

        public void ConfigureLocalDevelopmentServices(IServiceCollection services) {
            services.AddDbContextFactory<AppDbContext>(options => options.UseMySql(Configuration.GetConnectionString("LocalDevelopment"), new MySqlServerVersion(new Version(8, 0, 19)), builder => {
                builder.EnableStringComparisonTranslations();
            }));
            ConfigureServices(services);
        }

        public void ConfigureLocalProductionServices(IServiceCollection services) {
            services.AddDbContextFactory<AppDbContext>(options => options.UseMySql(Configuration.GetConnectionString("LocalProduction"), new MySqlServerVersion(new Version(8, 0, 19)), builder =>
                builder.EnableStringComparisonTranslations()));
            ConfigureServices(services);
        }

        public void ConfigureServices(IServiceCollection services) {
            Cors.AddCors(services);
            Identity.AddIdentity(services);
            Authentication.AddAuthentication(Configuration, services);
            Interfaces.AddInterfaces(services);
            services.AddTransient<ResponseMiddleware>();
            services.Configure<RazorViewEngineOptions>(options => options.ViewLocationExpanders.Add(new ViewLocationExpander()));
            services.AddAntiforgery(options => { options.Cookie.Name = "_af"; options.Cookie.HttpOnly = true; options.Cookie.SecurePolicy = CookieSecurePolicy.Always; options.HeaderName = "X-XSRF-TOKEN"; });
            services.AddAutoMapper(typeof(Startup));
            services.AddDbContext<AppDbContext>();
            services.AddScoped<ModelValidationAttribute>();
            services.AddControllersWithViews()
                    .AddNewtonsoftJson(options => {
                        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                        options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                    })
                    .AddFluentValidation();
            services.AddEmailSenders();
            ModelValidations.AddModelValidation(services);
            services.Configure<CookiePolicyOptions>(options => { options.CheckConsentNeeded = _ => true; options.MinimumSameSitePolicy = SameSiteMode.None; });
            services.Configure<EmailSettings>(options => Configuration.GetSection("EmailSettings").Bind(options));
            services.Configure<TokenSettings>(options => Configuration.GetSection("TokenSettings").Bind(options));
            services.Configure<DirectoryLocations>(options => Configuration.GetSection("DirectoryLocations").Bind(options));
        }

        public void ConfigureLocalDevelopment(IApplicationBuilder app) {
            app.UseDeveloperExceptionPage();
            Configure(app);
            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }

        public void ConfigureLocalProduction(IApplicationBuilder app) {
            app.UseHsts();
            Configure(app);
            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }

        public virtual void Configure(IApplicationBuilder app) {
            app.UseMiddleware<ResponseMiddleware>();
            app.UseDefaultFiles();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();
        }

    }

}
