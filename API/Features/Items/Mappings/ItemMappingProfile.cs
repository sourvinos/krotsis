using AutoMapper;

namespace API.Features.Items {

    public class ItemMappingProfile : Profile {

        public ItemMappingProfile() {
            CreateMap<Item, ItemListVM>();
            CreateMap<Item, ItemReadDto>();
            CreateMap<ItemWriteDto, Item>();
        }

    }

}