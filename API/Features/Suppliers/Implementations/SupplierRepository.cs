using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Features.Suppliers {

    public class SupplierRepository : Repository<Supplier>, ISupplierRepository {

        private readonly IMapper mapper;
        protected readonly ILogger<SupplierRepository> logger;

        public SupplierRepository(AppDbContext appDbContext, IMapper mapper, ILogger<SupplierRepository> logger) : base(appDbContext) {
            this.mapper = mapper;
            this.logger = logger;
        }

        public async Task<IEnumerable<SupplierListDto>> Get() {
            List<Supplier> records = await context.Suppliers
                .OrderBy(x => x.Description)
                .AsNoTracking()
                .ToListAsync();
            return mapper.Map<IEnumerable<Supplier>, IEnumerable<SupplierListDto>>(records);
        }

        public async Task<IEnumerable<SupplierListDto>> GetActive() {
            List<Supplier> records = await context.Suppliers
                .Where(x => x.IsActive)
                .OrderBy(x => x.Description)
                .AsNoTracking()
                .ToListAsync();
            return mapper.Map<IEnumerable<Supplier>, IEnumerable<SupplierListDto>>(records);
        }

        public async Task<Supplier> GetByIdToDelete(int id) {
            return await context.Suppliers.SingleOrDefaultAsync(m => m.Id == id);
        }

    }

}