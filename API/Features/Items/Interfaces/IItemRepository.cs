using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Items {

    public interface IItemRepository : IRepository<Item> {

        Task<IEnumerable<ItemListDto>> Get();
        Task<IEnumerable<ItemListDto>> GetActive();
        Task<Item> GetByIdToDelete(int id);

    }

}