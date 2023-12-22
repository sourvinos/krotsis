using API.Infrastructure.Interfaces;

namespace API.Features.Users {

    public class UserNewDto : IUser, IMetadata {

        //  Fields
        public string Username { get; set; }
        public string Displayname { get; set; }
        public bool IsFirstFieldFocused { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}