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

namespace API.Features.Items {

    public class ItemRepository : Repository<Item>, IItemRepository {

        private readonly IMapper mapper;

        public ItemRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<ItemListVM>> Get() {
            var items = await context.Items
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Item>, IEnumerable<ItemListVM>>(items);
        }

        public async Task<Item> GetById(int id) {
            return await context.Items
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

    }

}