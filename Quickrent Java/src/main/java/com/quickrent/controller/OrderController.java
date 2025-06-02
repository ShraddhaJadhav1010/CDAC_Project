package com.quickrent.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.quickrent.dto.OrderDTO;
import com.quickrent.pojo.Order;
import com.quickrent.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.quickrent.dto.OrderRequestDto;
import com.quickrent.dto.OrderResponseDto;
import com.quickrent.service.OrderService;
import com.quickrent.dto.RequestOrderDTO;


@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "*")
public class OrderController {
	@Autowired
	private OrderService orderService;
	
	public OrderController() {
		System.out.println("Inside Order Controller");
	}
	
	@GetMapping("/getorder/{orderId}")
	public ResponseEntity<?> getOrderData(@PathVariable Integer orderId){
		return ResponseEntity.ok(orderService.getOrderData(orderId));
	}

  // Get orders by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUserId(@PathVariable Integer userId) {
        List<OrderDTO> orderDTOs = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orderDTOs);
    }

    @PostMapping("/add")
    public OrderResponseDto createOrder(@RequestBody OrderRequestDto orderRequestDto) {
      return orderService.saveOrder(orderRequestDto);
    }
	
}

