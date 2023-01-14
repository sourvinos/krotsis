using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Features.Expenses;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Features.Transactions {

    public class TransactionRepository : Repository<Transaction>, ITransactionRepository {

        private readonly IMapper mapper;
        protected readonly ILogger<TransactionRepository> logger;

        public TransactionRepository(AppDbContext appDbContext, IMapper mapper, ILogger<TransactionRepository> logger) : base(appDbContext) {
            this.mapper = mapper;
            this.logger = logger;
        }

        public async Task<IEnumerable<TransactionListDto>> Get() {
            List<Transaction> records = await context.Transactions
                .Include(x => x.Supplier)
                .OrderBy(x => x.Date)
                .AsNoTracking()
                .ToListAsync();
            return mapper.Map<IEnumerable<Transaction>, IEnumerable<TransactionListDto>>(records);
        }

        public new async Task<Transaction> GetById(int id) {
            Transaction record = await context.Transactions
                .Include(x => x.Supplier)
                .SingleOrDefaultAsync(m => m.Id == id);
            if (record != null) {
                return record;
            } else {
                throw new CustomException { HttpResponseCode = 404 };
            }
        }

        public async Task<Transaction> GetByIdToDelete(int id) {
            return await context.Transactions.SingleOrDefaultAsync(m => m.Id == id);
        }

    }

}