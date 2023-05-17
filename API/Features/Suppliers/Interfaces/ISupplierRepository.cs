using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Suppliers {

    public interface ISupplierRepository : IRepository<Supplier> {

        Task<IEnumerable<SupplierListDto>> Get();
        Task<IEnumerable<SupplierListDto>> GetActive();
        Task<Supplier> GetByIdToDelete(int id);
        IEnumerable<SupplierLedgerVM> GetLedger(int id);
        IEnumerable<SupplierLedgerVM> BuildBalance(IEnumerable<SupplierLedgerVM> records);

    }

}