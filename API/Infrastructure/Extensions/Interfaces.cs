using API.Features.Items;
using API.Features.Settings;
using API.Features.Suppliers;
using API.Features.Transactions;
using API.Infrastructure.Auth;
using Microsoft.Extensions.DependencyInjection;

namespace API.Infrastructure.Extensions {

    public static class Interfaces {

        public static void AddInterfaces(IServiceCollection services) {
            services.AddScoped<Token>();
            services.AddTransient<IItemRepository, ItemRepository>();
            services.AddTransient<ITransactionRepository, TransactionRepository>();
            services.AddTransient<ISupplierRepository, SupplierRepository>();
            services.AddTransient<ISettingsRepository, SettingsRepository>();
        }

    }

}

