using API.Features.Items;
using API.Features.Users;
using API.Infrastructure.Account;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace API.Infrastructure.Extensions {

    public static class ModelValidations {

        public static void AddModelValidation(IServiceCollection services) {
            // Account
            services.AddTransient<IValidator<ChangePasswordVM>, ChangePasswordValidator>();
            services.AddTransient<IValidator<ForgotPasswordRequestVM>, ForgotPasswordValidator>();
            services.AddTransient<IValidator<ResetPasswordVM>, ResetPasswordValidator>();
            // Tables
            services.AddTransient<IValidator<ItemWriteDto>, ItemValidator>();
            // Users
            services.AddTransient<IValidator<UserNewDto>, UserNewValidator>();
            services.AddTransient<IValidator<UserUpdateDto>, UserUpdateValidator>();
        }

    }

}