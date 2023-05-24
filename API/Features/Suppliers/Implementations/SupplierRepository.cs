using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Features.Suppliers {

    public class SupplierRepository : Repository<Supplier>, ISupplierRepository {

        private readonly IMapper mapper;

        public SupplierRepository(AppDbContext appDbContext, IMapper mapper) : base(appDbContext) {
            this.mapper = mapper;
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

        public async Task<IEnumerable<SupplierLedgerDetailLineVM>> GetLedgerAsync(int id) {
            return await context.Transactions
                .Include(x => x.Supplier)
                .Where(x => x.SupplierId == id)
                .OrderBy(x => x.Date)
                .Select(x => new SupplierLedgerDetailLineVM {
                    Date = DateHelpers.DateToISOString(x.Date),
                    SupplierId = x.SupplierId,
                    CodeId = x.CodeId,
                    Debit = x.Code.DebitCreditId == 1 ? x.GrossAmount : 0,
                    Credit = x.Code.DebitCreditId == 2 ? x.GrossAmount : 0
                }).ToListAsync();
        }

        public IEnumerable<SupplierLedgerDetailLineVM> BuildBalance(IEnumerable<SupplierLedgerDetailLineVM> records) {
            decimal balance = 0;
            foreach (var record in records) {
                balance = balance + record.Debit - record.Credit;
                record.Balance = balance;
            }
            return records;
        }

        public SupplierLedgerVM BuildLedger(IEnumerable<SupplierLedgerDetailLineVM> records, string fromDate) {
            decimal debit = 0;
            decimal credit = 0;
            decimal balance = 0;
            foreach (var record in records) {
                if (Convert.ToDateTime(record.Date) < Convert.ToDateTime(fromDate)) {
                    debit += record.Debit;
                    credit += record.Credit;
                    balance = balance + record.Debit - record.Credit;
                }
            }
            var previousPeriod = new SupplierLedgerVM {
                Previous = new PreviousPeriod {
                    Debit = debit,
                    Credit = credit,
                    Balance = balance
                }
            };
            foreach (var record in records) {
                if (Convert.ToDateTime(record.Date) >= Convert.ToDateTime(fromDate)) {
                    previousPeriod.Requested.Add(record);
                }
            }
            return previousPeriod;
        }

    }

}