using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Features.Items {

    public class ItemRepository : Repository<Item>, IItemRepository {

        private readonly IMapper mapper;
        public ItemRepository(AppDbContext appDbContext, IMapper mapper) : base(appDbContext) {
            this.mapper = mapper;
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