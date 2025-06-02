using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.Model;

namespace Quickrent.Repository.Interface
{
    public interface IOrderRepository
    {
        Task<int> AddOrderAsync(Order order);
        Task<List<Order>> GetOrderByUserIdAsync(int userId);
        Order GetOrderByOrderId(int orderId);
    }
}