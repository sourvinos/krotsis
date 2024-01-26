using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Colors {

    [Route("api/[controller]")]
    public class ColorsController : ControllerBase {

        #region variables

        private readonly IColorRepository colorRepo;
        private readonly IMapper mapper;

        #endregion

        public ColorsController(IColorRepository colorRepo, IMapper mapper) {
            this.colorRepo = colorRepo;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<ColorListVM>> Get() {
            return await colorRepo.Get();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<ColorAutoCompleteVM>> GetAutoCompleteAsync() {
            return await colorRepo.GetAutoCompleteAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetById(int id) {
            var x = await colorRepo.GetById(id);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Color, ColorReadDto>(x)
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
        public Response Post([FromBody] ColorWriteDto color) {
            var z = colorRepo.Create(mapper.Map<ColorWriteDto, Color>(color));
            return new Response {
                Code = 200,
                Icon = Icons.Success.ToString(),
                Id = z.Id.ToString(),
                Message = ApiMessages.OK()
            };
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Put([FromBody] ColorWriteDto color) {
            var x = await colorRepo.GetById(color.Id);
            if (x != null) {
                colorRepo.Update(mapper.Map<ColorWriteDto, Color>(color));
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

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> Delete([FromRoute] int id) {
            var x = await colorRepo.GetById(id);
            if (x != null) {
                colorRepo.Delete(x);
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