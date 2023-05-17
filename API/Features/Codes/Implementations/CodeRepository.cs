using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Features.Codes {

    public class ItemRepository : Repository<Code>, ICodeRepository {

        private readonly IMapper mapper;
        protected readonly ILogger<ItemRepository> logger;

        public ItemRepository(AppDbContext appDbContext, IMapper mapper, ILogger<ItemRepository> logger) : base(appDbContext) {
            this.mapper = mapper;
            this.logger = logger;
        }

        public async Task<IEnumerable<CodeListDto>> Get() {
            List<Code> records = await context.Codes
                .OrderBy(x => x.Description)
                .AsNoTracking()
                .ToListAsync();
            return mapper.Map<IEnumerable<Code>, IEnumerable<CodeListDto>>(records);
        }

        public async Task<IEnumerable<CodeListDto>> GetActive() {
            List<Code> records = await context.Codes
                .Where(x => x.IsActive)
                .OrderBy(x => x.Description)
                .AsNoTracking()
                .ToListAsync();
            return mapper.Map<IEnumerable<Code>, IEnumerable<CodeListDto>>(records);
        }

        public async Task<Code> GetByIdToDelete(int id) {
            return await context.Codes.SingleOrDefaultAsync(m => m.Id == id);
        }

    }

}