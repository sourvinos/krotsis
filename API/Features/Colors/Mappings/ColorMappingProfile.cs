using AutoMapper;

namespace API.Features.Colors {

    public class ColorMappingProfile : Profile {

        public ColorMappingProfile() {
            CreateMap<Color, ColorListVM>();
            CreateMap<Color, ColorAutoCompleteVM>();
            CreateMap<Color, ColorReadDto>();
            CreateMap<ColorWriteDto, Color>();
        }

    }

}