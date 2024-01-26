using FluentValidation;

namespace API.Features.Colors {

    public class ColorValidator : AbstractValidator<ColorWriteDto> {

        public ColorValidator() {
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}