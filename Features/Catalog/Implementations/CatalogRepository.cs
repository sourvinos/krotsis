using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Krotsis {

    public class CatalogRepository : Repository<Catalog>, ICatalogRepository {

        private readonly IMapper mapper;

        public CatalogRepository(DbContext appDbContext, IMapper mapper) : base(appDbContext) {
            this.mapper = mapper;
        }

    }

}