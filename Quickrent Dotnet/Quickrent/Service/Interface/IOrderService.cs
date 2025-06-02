using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.DTO.OrderDTO;

namespace Quickrent.Service.Interface
{
    public interface IOrderService
    {
        Task<int> AddOrderAsync(ReqAddOrderDto orderDto);
        Task<List<ResGetOrderByIdDto>> GetOrderByUserIdAsync(int orderId);

        ResGetOrderByOrderIdDto GetOrderByOrderId(int orderId);
    }
}