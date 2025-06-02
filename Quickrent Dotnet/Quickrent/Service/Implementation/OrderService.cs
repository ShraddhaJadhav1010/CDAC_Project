using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Quickrent.DTO.OrderDTO;
using Quickrent.Model;
using Quickrent.Repository.Interface;
using Quickrent.Service.Interface;

namespace Quickrent.Service.Implementation
{
    public class OrderService: IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task<int> AddOrderAsync(ReqAddOrderDto orderDto)
        {
            var order = _mapper.Map<Order>(orderDto);
            if (order == null)
            {
                throw new InvalidOperationException("Mapping failed.");
            }
            return await _orderRepository.AddOrderAsync(order);
        }

        public async Task<List<ResGetOrderByIdDto>> GetOrderByUserIdAsync(int userId)
        {
            var order = await _orderRepository.GetOrderByUserIdAsync(userId);

            if (order == null)
            {
                return null;
            }

            return _mapper.Map<List<ResGetOrderByIdDto>>(order);
        }

        public ResGetOrderByOrderIdDto GetOrderByOrderId(int orderId){
            Order order = _orderRepository.GetOrderByOrderId(orderId);
            return _mapper.Map<ResGetOrderByOrderIdDto>(order);
        }

    }
}