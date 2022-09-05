using AutoMapper;

namespace API.Features.Items {

    public class ItemMappingProfile : Profile {

        public ItemMappingProfile() {
            CreateMap<Item, ItemListDto>();
            CreateMap<Item, ItemReadDto>();
            CreateMap<ItemWriteDto, Item>();
        }

    }

}