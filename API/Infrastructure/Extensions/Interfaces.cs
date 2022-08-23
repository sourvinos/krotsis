using API.Features.Items;
using API.Infrastructure.Auth;
using API.Infrastructure.Implementations;
using API.Infrastructure.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace API.Infrastructure.Extensions {

    public static class Interfaces {

        public static void AddInterfaces(IServiceCollection services) {
            services.AddScoped<Token>();
            services.AddTransient<IItemRepository, ItemRepository>();
            services.AddTransient<IDateTimeProvider, DateTimeProvider>();
        }

    }

}

