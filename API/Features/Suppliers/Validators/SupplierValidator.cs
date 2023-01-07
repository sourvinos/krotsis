using FluentValidation;

namespace API.Features.Suppliers {

    public class SupplierValidator : AbstractValidator<SupplierWriteDto> {

        public SupplierValidator() {
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
            RuleFor(x => x.TaxNo).NotEmpty().MaximumLength(15);
        }

    }

}