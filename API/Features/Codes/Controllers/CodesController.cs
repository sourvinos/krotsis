using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Features.Codes {

    [Route("api/[controller]")]
    public class CodesController : ControllerBase {

        #region variables

        private readonly ICodeRepository repo;
        private readonly IHttpContextAccessor httpContext;
        private readonly IMapper mapper;
        private readonly ILogger<CodesController> logger;

        #endregion

        public CodesController(ICodeRepository repo, IHttpContextAccessor httpContext, IMapper mapper, ILogger<CodesController> logger) {
            this.httpContext = httpContext;
            this.mapper = mapper;
            this.repo = repo;
            this.logger = logger;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<CodeListDto>> Get() {
            return await repo.Get();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<CodeListDto>> GetActive() {
            return await repo.GetActive();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<CodeReadDto> GetCode(int id) {
            return mapper.Map<Code, CodeReadDto>(await repo.GetById(id));
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PostCodeAsync([FromBody] CodeWriteDto record) {
            repo.Create(mapper.Map<CodeWriteDto, Code>(await AttachUserIdToRecord(record)));
            logger.LogInformation("Record created {@record}", record);
            return ApiResponses.OK();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PutCodeAsync([FromBody] CodeWriteDto record) {
            repo.Update(mapper.Map<CodeWriteDto, Code>(await AttachUserIdToRecord(record)));
            return ApiResponses.OK();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> DeleteCode([FromRoute] int id) {
            repo.Delete(await repo.GetByIdToDelete(id));
            return ApiResponses.OK();
        }

        private async Task<CodeWriteDto> AttachUserIdToRecord(CodeWriteDto record) {
            var user = await Identity.GetConnectedUserId(httpContext);
            record.UserId = user.UserId;
            return record;
        }

    }

}