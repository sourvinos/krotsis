using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Features.Items {

    public class ItemRepository : Repository<Item>, IItemRepository {

        private readonly IMapper mapper;
        protected readonly ILogger<ItemRepository> logger;

        public ItemRepository(AppDbContext appDbContext, IMapper mapper, ILogger<ItemRepository> logger) : base(appDbContext) {
            this.mapper = mapper;
            this.logger = logger;
        }

        public async Task<IEnumerable<ItemListDto>> Get() {
            List<Item> records = await context.Items
                .OrderBy(x => x.Description)
                .AsNoTracking()
                .ToListAsync();
            return mapper.Map<IEnumerable<Item>, IEnumerable<ItemListDto>>(records);
        }

        public async Task<IEnumerable<ItemListDto>> GetActive() {
            List<Item> records = await context.Items
                .Where(x => x.IsActive)
                .OrderBy(x => x.Description)
                .AsNoTracking()
                .ToListAsync();
            return mapper.Map<IEnumerable<Item>, IEnumerable<ItemListDto>>(records);
        }

        public async Task<Item> GetByIdToDelete(int id) {
            return await context.Items.SingleOrDefaultAsync(m => m.Id == id);
        }

    }

}