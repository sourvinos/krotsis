using System;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Suppliers {

    public class SupplierMappingProfile : Profile {

        public SupplierMappingProfile() {
            CreateMap<Supplier, SupplierListDto>();
            CreateMap<Supplier, SupplierReadDto>();
            CreateMap<SupplierWriteDto, Supplier>()
                .ForMember(x => x.TimeStamp, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(DateTime.Now)));
        }

    }

}