using FluentValidation;

namespace Krotsis {

    public class CatalogValidator : AbstractValidator<Catalog> {

        public CatalogValidator() {
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
            RuleFor(x => x.NetPrice).NotEmpty().GreaterThanOrEqualTo(0);
            RuleFor(x => x.GrossPrice).NotEmpty().GreaterThanOrEqualTo(0);
        }

    }

}