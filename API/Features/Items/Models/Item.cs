using API.Features.Colors;
using API.Infrastructure.Interfaces;

namespace API.Features.Items {

    public class Item : IBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // FKs
        public int ColorId { get; set; }
        // Fields
        public string Description { get; set; }
        public byte VatPercent { get; set; }
        public decimal NetPrice { get; set; }
        public decimal GrossPrice { get; set; }
        public bool IsActive { get; set; }
        // Navigation
        public Color Color { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}