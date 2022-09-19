using System;
using API.Infrastructure.Identity;

namespace API.Features.Items {

    public class Item {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public byte VatPercent { get; set; }
        public decimal NetPrice { get; set; }
        public decimal GrossPrice { get; set; }
        public bool IsActive { get; set; }
        public string TimeStamp { get; set; }
        // FKs
        public string UserId { get; set; }
        // Navigation
        public UserExtended User { get; set; }

    }

}