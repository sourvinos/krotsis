using API.Features.Expenses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Transactions {

    internal class TransactionsConfig : IEntityTypeConfiguration<Transaction> {

        public void Configure(EntityTypeBuilder<Transaction> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // FKs
            entity.Property(x => x.SupplierId).IsRequired(true);
            entity.Property(x => x.UserId).HasMaxLength(36).IsRequired(true);
            // Fields
            entity.Property(x => x.Date).IsRequired(true);
            entity.Property(x => x.InvoiceNo).HasMaxLength(32).IsRequired(true);
            entity.Property(x => x.Remarks).HasMaxLength(128);
            // FK Constraints
            entity.HasOne(x => x.User).WithMany(x => x.Transactions).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Restrict);
        }

    }

}