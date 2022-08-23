using System.ComponentModel.DataAnnotations;

namespace API.Infrastructure.Identity {

    public class ConfirmEmailViewModel {

        [Required]
        public string UserId { get; set; }

        [Required]
        public string Token { get; set; }

    }

}