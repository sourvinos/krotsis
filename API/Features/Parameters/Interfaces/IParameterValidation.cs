using API.Infrastructure.Interfaces;

namespace API.Features.Parameters {

    public interface IParameterValidation : IRepository<Parameter> {

        int IsValid(Parameter x, ParameterWriteDto parameter);

    }

}