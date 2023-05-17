using API.Infrastructure.Identity;

namespace API.Features.Codes {

    public class Code {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public int DebitCreditId { get; set; }
        public bool IsActive { get; set; }
        public string TimeStamp { get; set; }
        // FKs
        public string UserId { get; set; }
        // Navigation
        public UserExtended User { get; set; }

    }

}