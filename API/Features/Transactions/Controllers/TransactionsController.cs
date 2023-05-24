using System.Collections.Generic;
using System.Threading.Tasks;
using API.Features.Expenses;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Transactions {

    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase {

        #region variables

        private readonly IHttpContextAccessor httpContext;
        private readonly IMapper mapper;
        private readonly ITransactionRepository repo;

        #endregion

        public TransactionsController(IHttpContextAccessor httpContext, IMapper mapper, ITransactionRepository repo) {
            this.httpContext = httpContext;
            this.mapper = mapper;
            this.repo = repo;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<TransactionListDto>> Get() {
            return await repo.Get();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<TransactionReadDto> GetItem(int id) {
            return mapper.Map<Transaction, TransactionReadDto>(await repo.GetById(id));
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PostTransactionAsync([FromBody] TransactionWriteDto record) {
            repo.Create(mapper.Map<TransactionWriteDto, Transaction>(await AttachUserIdToRecord(record)));
            return ApiResponses.OK();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PutTransactionAsync([FromBody] TransactionWriteDto record) {
            repo.Update(mapper.Map<TransactionWriteDto, Transaction>(await AttachUserIdToRecord(record)));
            return ApiResponses.OK();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> DeleteTransaction([FromRoute] int id) {
            repo.Delete(await repo.GetByIdToDelete(id));
            return ApiResponses.OK();
        }

        private async Task<TransactionWriteDto> AttachUserIdToRecord(TransactionWriteDto record) {
            var user = await Identity.GetConnectedUserId(httpContext);
            record.UserId = user.UserId;
            return record;
        }

    }

}