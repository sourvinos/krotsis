using API.Features.Colors;
using API.Features.Items;
using API.Features.Parameters;
using API.Features.Users;
using API.Infrastructure.Auth;
using Microsoft.Extensions.DependencyInjection;

namespace API.Infrastructure.Extensions {

    public static class Interfaces {

        public static void AddInterfaces(IServiceCollection services) {
            services.AddScoped<Token>();
            // Tables
            services.AddTransient<IItemRepository, ItemRepository>();
            services.AddTransient<IColorRepository, ColorRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            // Validations
            services.AddTransient<IItemValidation, ItemValidation>();
            services.AddTransient<IParameterValidation, ParameterValidation>();
            services.AddTransient<IUserValidation<IUser>, UserValidation>();
            // Parameters
            services.AddTransient<IParametersRepository, ParametersRepository>();
            // Emails
            services.AddTransient<IEmailSender, EmailSender>();
        }

    }

}

