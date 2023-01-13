using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Features.Transactions
{

    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase {

        #region variables

        private readonly ITransactionRepository repo;
        private readonly IHttpContextAccessor httpContext;
        private readonly IMapper mapper;
        private readonly ILogger<TransactionsController> logger;

        #endregion

        public TransactionsController(ITransactionRepository repo, IHttpContextAccessor httpContext, IMapper mapper, ILogger<TransactionsController> logger) {
            this.httpContext = httpContext;
            this.mapper = mapper;
            this.repo = repo;
            this.logger = logger;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<TransactionListDto>> Get() {
            return await repo.Get();
        }

    }

}