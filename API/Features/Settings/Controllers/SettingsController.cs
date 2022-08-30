using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Settings {

    [Route("api/[controller]")]
    public class SettingsController : ControllerBase {

        #region variables

        private readonly ISettingsRepository repo;
        private readonly IHttpContextAccessor httpContext;

        #endregion

        public SettingsController(ISettingsRepository repo, IHttpContextAccessor httpContext) {
            this.httpContext = httpContext;
            this.repo = repo;
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<Settings> Get(int id) {
            return await repo.GetById(id);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PutSettingsAsync([FromBody] Settings record) {
            repo.Update(await AttachUserIdToRecord(record));
            return ApiResponses.OK();
        }

        private async Task<Settings> AttachUserIdToRecord(Settings record) {
            var user = await Identity.GetConnectedUserId(httpContext);
            record.UserId = user.UserId;
            return record;
        }

    }

}