using API.Infrastructure.Classes;
using AutoMapper;

namespace API.Features.Items {

    public class ItemMappingProfile : Profile {

        public ItemMappingProfile() {
            CreateMap<Item, ItemListDto>();
            CreateMap<Item, ItemReadDto>();
            CreateMap<Item, SimpleResource>();
            CreateMap<ItemWriteDto, Item>();
        }

    }

}