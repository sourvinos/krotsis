using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Suppliers {

    public interface ISupplierRepository : IRepository<Supplier> {

        Task<IEnumerable<SupplierListDto>> Get();
        Task<IEnumerable<SupplierListDto>> GetActive();
        Task<Supplier> GetByIdToDelete(int id);
        Task<IEnumerable<SupplierLedgerDetailLineVM>> GetLedgerAsync(int id);
        IEnumerable<SupplierLedgerDetailLineVM> BuildBalance(IEnumerable<SupplierLedgerDetailLineVM> records);
        SupplierLedgerVM BuildLedger(IEnumerable<SupplierLedgerDetailLineVM> records, string fromDate);

    }

}