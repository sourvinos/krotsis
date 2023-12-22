using API.Infrastructure.Interfaces;

namespace API.Features.Items {

    public interface IItemValidation : IRepository<Item> {

        int IsValid(Item x, ItemWriteDto item);

    }

}