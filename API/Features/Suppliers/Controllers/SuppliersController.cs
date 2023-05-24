using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Suppliers {

    [Route("api/[controller]")]
    public class SuppliersController : ControllerBase {

        #region variables

        private readonly ISupplierRepository repo;
        private readonly IHttpContextAccessor httpContext;
        private readonly IMapper mapper;

        #endregion

        public SuppliersController(ISupplierRepository repo, IHttpContextAccessor httpContext, IMapper mapper) {
            this.httpContext = httpContext;
            this.mapper = mapper;
            this.repo = repo;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<SupplierListDto>> Get() {
            return await repo.Get();
        }

        [HttpGet("[action]")]
        [AllowAnonymous]
        public async Task<IEnumerable<SupplierListDto>> GetActive() {
            return await repo.GetActive();
        }

        [HttpGet("{id}")]
        public async Task<SupplierReadDto> GetSupplier(int id) {
            return mapper.Map<Supplier, SupplierReadDto>(await repo.GetById(id));
        }

        [Authorize(Roles = "admin")]
        [HttpGet("ledger/{id}/fromDate/{date}")]
        public async Task<SupplierLedgerVM> GetLedgerAsync(int id, string date) {
            return repo.BuildLedger(repo.BuildBalance(await repo.GetLedgerAsync(id)), date);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PostSupplierAsync([FromBody] SupplierWriteDto record) {
            repo.Create(mapper.Map<SupplierWriteDto, Supplier>(await AttachUserIdToRecord(record)));
            return ApiResponses.OK();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PutSupplierAsync([FromBody] SupplierWriteDto record) {
            repo.Update(mapper.Map<SupplierWriteDto, Supplier>(await AttachUserIdToRecord(record)));
            return ApiResponses.OK();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> DeleteSupplier([FromRoute] int id) {
            repo.Delete(await repo.GetByIdToDelete(id));
            return ApiResponses.OK();
        }

        private async Task<SupplierWriteDto> AttachUserIdToRecord(SupplierWriteDto record) {
            var user = await Identity.GetConnectedUserId(httpContext);
            record.UserId = user.UserId;
            return record;
        }

    }

}