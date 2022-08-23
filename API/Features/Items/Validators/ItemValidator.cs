using FluentValidation;

namespace API.Features.Items {

    public class ItemValidator : AbstractValidator<ItemWriteDto> {

        public ItemValidator() {
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
            RuleFor(x => x.VatPercent).NotEmpty();
            RuleFor(x => x.NetPrice).NotEmpty();
            RuleFor(x => x.GrossPrice).NotEmpty();
        }

    }

}