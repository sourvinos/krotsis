using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Krotsis {

    public static class Extensions {

        public static void AddCors(IServiceCollection services) {
            services.AddCors(options =>
                options.AddPolicy("EnableCORS", builder => {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials().Build();
                }));
        }

        public static void AddInterfaces(IServiceCollection services) {
            services.AddTransient<ICatalogRepository, CatalogRepository>();
        }

        public static void AddValidation(IServiceCollection services) {
            services.AddTransient<IValidator<Catalog>, CatalogValidator>();
        }

    }

}