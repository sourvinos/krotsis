using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Codes {

    public interface ICodeRepository : IRepository<Code> {

        Task<IEnumerable<CodeListDto>> Get();
        Task<IEnumerable<CodeListDto>> GetActive();
        Task<Code> GetByIdToDelete(int id);

    }

}