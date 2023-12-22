using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Features.Items {

    public class ItemValidation : Repository<Item>, IItemValidation {

        public ItemValidation(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) { }

        public int IsValid(Item z, ItemWriteDto item) {
            return true switch {
                var x when x == IsAlreadyUpdated(z, item) => 415,
                _ => 200,
            };
        }

        private static bool IsAlreadyUpdated(Item z, ItemWriteDto item) {
            return z != null && z.PutAt != item.PutAt;
        }

    }

}