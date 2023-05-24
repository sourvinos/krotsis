using API.Infrastructure.Identity;

namespace API.Features.Suppliers {

    public class Supplier {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string TaxNo { get; set; }
        public bool IsActive { get; set; }
        public string TimeStamp { get; set; }
        // FKs
        public string UserId { get; set; }
        // Navigation
        public UserExtended User { get; set; }

    }

}