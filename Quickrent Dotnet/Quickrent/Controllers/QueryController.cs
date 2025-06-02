using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quickrent.DTO;
using Quickrent.Model;
using Quickrent.Service.Interface;

namespace Quickrent.Controllers
{
    //[ApiController]
    public class QueryController : ControllerBase
    {
        private readonly ILogger<QueryController> _logger;
        private readonly IQueryService _queryService;

        public QueryController(ILogger<QueryController> logger, IQueryService queryService)
        {
            _logger = logger;
            _queryService = queryService;
        }

        [Route("api/query/add")]
        [HttpPost]
        public IActionResult AddQuery([FromBody] ContactQueryDto queryDto)
        {
            if (queryDto == null)
                return BadRequest("Invalid data");

            _queryService.AddQuery(queryDto);
            return Ok(new { message = "Query added successfully!" });
        }

        [Route("api/query/getall")]
        // GET: api/Query - Retrieves all queries
        [HttpGet]
        public IActionResult GetAllQueries()
        {
            var queries = _queryService.GetAllQueries();
            return Ok(queries);
        }

        //[HttpGet("test-claims")]
        //[Authorize]
        //public IActionResult TestClaims()
        //{
        //    var user = HttpContext.User;
        //    var claims = user.Claims.Select(c => new { c.Type, c.Value }).ToList();
        //    return Ok(claims);
        //}

    }
}
