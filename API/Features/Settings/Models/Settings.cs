using API.Infrastructure.Identity;

namespace API.Features.Settings {

    public class Settings {

        // PK
        public int Id { get; set; }
        //  Fields
        public string LineA { get; set; }
        public string LineB { get; set; }
        public string LineC { get; set; }
        public string LineD { get; set; }
        public string LineE { get; set; }
        public string LineF { get; set; }
        public string LineG { get; set; }
        public string LineH { get; set; }
        // FKs
        public string UserId { get; set; }
        // Navigation
        public UserExtended User { get; set; }

    }

}