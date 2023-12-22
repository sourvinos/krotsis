using API.Infrastructure.Helpers;
using FluentValidation;

namespace API.Features.Parameters {

    public class ParameterValidator : AbstractValidator<Parameter> {

        public ParameterValidator() {
            RuleFor(x => x.Phones).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Email).Must(EmailHelpers.BeValidEmailAddress).MaximumLength(128);
        }

    }

}