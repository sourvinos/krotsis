using API.Infrastructure.Classes;
using AutoMapper;

namespace API.Features.Items {

    public class ItemMappingProfile : Profile {

        public ItemMappingProfile() {
            CreateMap<Item, ItemListVM>();
            CreateMap<Item, ItemReadDto>()
                .ForMember(x => x.Color, x => x.MapFrom(x => new SimpleEntity { Id = x.Color.Id, Description = x.Color.Description }));
            CreateMap<ItemWriteDto, Item>();
        }

    }

}