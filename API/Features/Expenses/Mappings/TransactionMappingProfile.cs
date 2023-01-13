using API.Features.Expenses;
using AutoMapper;

namespace API.Features.Transactions {

    public class TransactionMappingProfile : Profile {

        public TransactionMappingProfile() {
            CreateMap<Transaction, TransactionListDto>();
        }

    }

}