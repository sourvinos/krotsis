using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Items {

    [Route("api/[controller]")]
    public class ItemsController : ControllerBase {

        #region variables

        private readonly IItemRepository itemRepo;
        private readonly IItemValidation itemValidation;
        private readonly IMapper mapper;

        #endregion

        public ItemsController(IItemRepository itemRepo, IItemValidation itemValidation, IMapper mapper) {
            this.itemRepo = itemRepo;
            this.itemValidation = itemValidation;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<ItemListVM>> Get() {
            return await itemRepo.Get();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<ItemListVM>> GetActive() {
            return await itemRepo.GetActive();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetById(int id) {
            var x = await itemRepo.GetById(id);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Item, ItemReadDto>(x)
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public Response Post([FromBody] ItemWriteDto item) {
            var x = itemValidation.IsValid(null, item);
            if (x == 200) {
                var z = itemRepo.Create(mapper.Map<ItemWriteDto, Item>((ItemWriteDto)itemRepo.AttachMetadataToPostDto(item)));
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = z.Id.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = x
                };
            }
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Put([FromBody] ItemWriteDto item) {
            var x = await itemRepo.GetById(item.Id);
            if (x != null) {
                var z = itemValidation.IsValid(x, item);
                if (z == 200) {
                    itemRepo.Update(mapper.Map<ItemWriteDto, Item>((ItemWriteDto)itemRepo.AttachMetadataToPutDto(x, item)));
                    return new Response {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Id = x.Id.ToString(),
                        Message = ApiMessages.OK()
                    };
                } else {
                    throw new CustomException() {
                        ResponseCode = z
                    };
                }
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> Delete([FromRoute] int id) {
            var x = await itemRepo.GetById(id);
            if (x != null) {
                itemRepo.Delete(x);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = x.Id.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

    }

}