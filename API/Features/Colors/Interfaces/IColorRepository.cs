using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Colors {

    public interface IColorRepository : IRepository<Color> {

        Task<IEnumerable<ColorListVM>> Get();
        Task<IEnumerable<ColorAutoCompleteVM>> GetAutoCompleteAsync();
        Task<Color> GetById(int id);

    }

}