using AutoMapper;

namespace API.Features.Parameters {

    public class ParameterMappingProfile : Profile {

        public ParameterMappingProfile() {
            CreateMap<Parameter, ParameterReadDto>();
            CreateMap<ParameterWriteDto, Parameter>();
        }

    }

}