using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Items {

    public interface IItemRepository : IRepository<Item> {

        Task<IEnumerable<ItemListVM>> Get();
        Task<Item> GetById(int id);

    }

}