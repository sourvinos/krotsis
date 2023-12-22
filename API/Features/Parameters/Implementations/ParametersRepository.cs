using System.Threading.Tasks;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Parameters {

    public class ParametersRepository : Repository<Parameter>, IParametersRepository {

        public ParametersRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> boosettings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, boosettings, userManager) { }

        public async Task<Parameter> GetAsync() {
            return await context.Parameters
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }

    }

}