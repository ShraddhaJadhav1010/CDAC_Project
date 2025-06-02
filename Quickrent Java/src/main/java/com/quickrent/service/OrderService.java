package com.quickrent.service;

import com.quickrent.dto.ResponseOrderDTO;
import com.quickrent.dto.OrderRequestDto;
import com.quickrent.dto.OrderResponseDto;
import com.quickrent.dto.OrderDTO;
import com.quickrent.pojo.Order;

import java.util.List;

public interface OrderService {

    // Fetch orders by user ID
    List<OrderDTO> getOrdersByUserId(Integer userId);

    /*
     * Extra by Ashwini
    // Save a new order
    Order saveOrder(Order order);
    */
  
    OrderResponseDto saveOrder(OrderRequestDto orderRequestDto);
  
    ResponseOrderDTO getOrderData(int orderId);
}
