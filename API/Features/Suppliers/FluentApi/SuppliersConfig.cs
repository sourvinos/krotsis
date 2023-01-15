using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Suppliers {

    internal class SuppliersConfig : IEntityTypeConfiguration<Supplier> {

        public void Configure(EntityTypeBuilder<Supplier> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // FKs
            entity.Property(x => x.UserId).HasMaxLength(36).IsRequired(true);
            // Fields
            entity.Property(x => x.Description).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.TaxNo).HasMaxLength(15).IsRequired(true);
            entity.Property(x => x.IsActive);
            entity.Property(x => x.TimeStamp).HasMaxLength(19);
            // FK Constraints
            entity.HasOne(x => x.User).WithMany(x => x.Suppliers).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Restrict);
        }

    }

}