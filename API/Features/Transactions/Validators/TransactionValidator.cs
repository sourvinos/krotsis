using API.Features.Expenses;
using FluentValidation;

namespace API.Features.Transactions {

    public class TransactionValidator : AbstractValidator<Transaction> {

        public TransactionValidator() {
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.CodeId).NotEmpty();
            RuleFor(x => x.SupplierId).NotEmpty();
            RuleFor(x => x.InvoiceNo).NotEmpty();
        }

    }

}