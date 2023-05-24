using System;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Codes {

    public class CodeMappingProfile : Profile {

        public CodeMappingProfile() {
            CreateMap<Code, CodeListDto>();
            CreateMap<Code, CodeReadDto>();
            CreateMap<CodeWriteDto, Code>()
                .ForMember(x => x.TimeStamp, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(DateTime.Now)));
        }

    }

}