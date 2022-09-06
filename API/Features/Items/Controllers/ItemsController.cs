using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Interfaces;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Features.Items {

    [Route("api/[controller]")]
    public class ItemsController : ControllerBase {

        #region variables

        private readonly IItemRepository repo;
        private readonly IHttpContextAccessor httpContext;
        private readonly IMapper mapper;
        private readonly ILogger<ItemsController> logger;

        #endregion

        public ItemsController(IItemRepository repo, IHttpContextAccessor httpContext, IMapper mapper, ILogger<ItemsController> logger) {
            this.httpContext = httpContext;
            this.mapper = mapper;
            this.repo = repo;
            this.logger = logger;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<ItemListDto>> Get() {
            return await repo.Get();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<ItemListDto>> GetActive() {
            return await repo.GetActive();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ItemReadDto> GetItem(int id) {
            return mapper.Map<Item, ItemReadDto>(await repo.GetById(id));
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PostItemAsync([FromBody] ItemWriteDto record) {
            repo.Create(mapper.Map<ItemWriteDto, Item>(await AttachUserIdToRecord(record)));
            logger.LogInformation("Record created {@record}", record);
            return ApiResponses.OK();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PutItemAsync([FromBody] ItemWriteDto record) {
            repo.Update(mapper.Map<ItemWriteDto, Item>(await AttachUserIdToRecord(record)));
            return ApiResponses.OK();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> DeleteItem([FromRoute] int id) {
            repo.Delete(await repo.GetByIdToDelete(id));
            return ApiResponses.OK();
        }

        private async Task<ItemWriteDto> AttachUserIdToRecord(ItemWriteDto record) {
            var user = await Identity.GetConnectedUserId(httpContext);
            record.UserId = user.UserId;
            return record;
        }

    }

}