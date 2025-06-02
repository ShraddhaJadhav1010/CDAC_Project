using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Quickrent.DTO.OrderDTO;
using Quickrent.Service.Interface;

namespace Quickrent.Controllers
{
    //[Route("api/order")]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        private readonly IOrderService _orderService;

        public OrderController(ILogger<OrderController> logger, IOrderService orderService)
        {
            _logger = logger;
            _orderService = orderService;
        }

        // POST: api/Order
        [Route("api/order/add")]
        //[Authorize(Roles = "Customer")]
        [HttpPost]
        public async Task<ActionResult> AddOrder([FromBody] ReqAddOrderDto orderDto)
        {
            int orderId = await _orderService.AddOrderAsync(orderDto);
            return Ok(orderId);
        }

        [Route("api/order/user/{userId}")]
        //[Authorize(Roles = "Customer")]
        [HttpGet]
        public async Task<IActionResult> GetOrderByUserId(int userId)
        {
            var order = await _orderService.GetOrderByUserIdAsync(userId);
            if (order == null)
                return NotFound();

            return Ok(order);
        }

        [Route("api/order/getorder/{orderId}")]
        //[Authorize(Roles = "Customer")]
        [HttpGet]
        public IActionResult GetOrderByOrderId(int orderId){
            ResGetOrderByOrderIdDto dto = _orderService.GetOrderByOrderId(orderId);
            return Ok(dto);
        }

    }
}