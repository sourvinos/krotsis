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

        /// <summary>
        /// Gets the transactions for the supplier and according to the codeId field in the codes table
        /// puts the gross amount field in either the debit or the credit
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<SupplierLedgerVM> GetLedger(int id) {
            return context.Transactions
                .Include(x => x.Supplier)
                .Where(x => x.SupplierId == id)
                .Select(x => new SupplierLedgerVM {
                    Date = x.Date.ToString(),
                    CodeId = x.CodeId,
                    Debit = x.Code.DebitCreditId == 1 ? x.GrossAmount : 0,
                    Credit = x.Code.DebitCreditId == 2 ? x.GrossAmount : 0
                }).ToList();
        }

        /// <summary>
        /// Builds the accumulated balance based on the previous step
        /// </summary>
        /// <param name="records"></param>
        /// <returns></returns>
        public IEnumerable<SupplierLedgerVM> BuildBalance(IEnumerable<SupplierLedgerVM> records) {
            decimal balance = 0;
            foreach (var record in records) {
                balance = balance + record.Debit - record.Credit;
                record.Balance = balance;
            }
            return records;
        }

    }

}