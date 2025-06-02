using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quickrent.Data;
using Quickrent.Model;
using Quickrent.Repository.Interface;

namespace Quickrent.Repository.Implementation
{
    public class OrderRepository: IOrderRepository
    {
        private readonly QuickrentContext _context;

        public OrderRepository(QuickrentContext context)
        {
            _context = context;
        }

        public async Task<int> AddOrderAsync(Order order)
        {
            await _context.Order.AddAsync(order);
            await _context.SaveChangesAsync();
            return order.OrderId;
        }

        public async Task<List<Order>> GetOrderByUserIdAsync(int userId)
        {
            return await _context.Order
                .Include(o => o.User)
                .Include(o => o.Product)
                .Where(o => o.User.UserId == userId).ToListAsync();
        }

        public Order GetOrderByOrderId(int orderId){
            return _context.Order
                .Include(o => o.User)
                .Include(o => o.Product)
                .ThenInclude(p => p.User)
                .SingleOrDefault(s => s.OrderId == orderId);
        }
    }
}