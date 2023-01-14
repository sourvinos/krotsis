using System.Collections.Generic;
using System.Threading.Tasks;
using API.Features.Expenses;
using API.Infrastructure.Interfaces;

namespace API.Features.Transactions {

    public interface ITransactionRepository : IRepository<Transaction> {

        Task<IEnumerable<TransactionListDto>> Get();
        Task<Transaction> GetByIdToDelete(int id);

    }

}