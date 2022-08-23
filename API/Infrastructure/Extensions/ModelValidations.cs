using API.Features.Items;
using API.Infrastructure.Identity;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace API.Infrastructure.Extensions {

    public static class ModelValidations {

        public static void AddModelValidation(IServiceCollection services) {
            services.AddTransient<IValidator<ItemWriteDto>, ItemValidator>();
            services.AddTransient<IValidator<UserUpdateDto>, UserValidator>();
        }

    }

}