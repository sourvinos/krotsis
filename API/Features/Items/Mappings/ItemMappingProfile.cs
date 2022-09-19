using System;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Items {

    public class ItemMappingProfile : Profile {

        public ItemMappingProfile() {
            CreateMap<Item, ItemListDto>();
            CreateMap<Item, ItemReadDto>();
            CreateMap<ItemWriteDto, Item>()
                .ForMember(x => x.TimeStamp, x => x.MapFrom(x => DateTimeHelpers.ServerDateTimeToISOString(DateTime.Now)));
        }

    }

}