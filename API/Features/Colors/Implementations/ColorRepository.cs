using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Colors {

    public class ColorRepository : Repository<Color>, IColorRepository {

        private readonly IMapper mapper;

        public ColorRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<ColorListVM>> Get() {
            var colors = await context.Colors
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Color>, IEnumerable<ColorListVM>>(colors);
        }

        public async Task<IEnumerable<ColorAutoCompleteVM>> GetAutoCompleteAsync() {
            var colors = await context.Colors
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Color>, IEnumerable<ColorAutoCompleteVM>>(colors);
        }

        public async Task<Color> GetById(int id) {
            return await context.Colors
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

    }

}