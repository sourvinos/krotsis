using System;
using API.Features.Expenses;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Transactions {

    public class TransactionMappingProfile : Profile {

        public TransactionMappingProfile() {
            CreateMap<Transaction, TransactionListDto>()
                .ForMember(x => x.Date, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(x.Date)))
                .ForMember(x => x.SupplierDescription, x => x.MapFrom(x => x.Supplier.Description))
                .ForMember(x => x.GrossAmount, x => x.MapFrom(x => x.GrossAmount.ToString("0.00")));
            CreateMap<Transaction, TransactionReadDto>()
                .ForMember(x => x.Date, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(x.Date)));
            CreateMap<TransactionWriteDto, Transaction>()
                .ForMember(x => x.TimeStamp, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(DateTime.Now)));
        }

    }

}