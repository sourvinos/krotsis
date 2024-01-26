using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Colors {

    internal class ColorsConfig : IEntityTypeConfiguration<Color> {

        public void Configure(EntityTypeBuilder<Color> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // Fields
            entity.Property(x => x.Description).HasMaxLength(128).IsRequired(true);
        }

    }

}