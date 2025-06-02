package com.quickrent.service;

import org.hibernate.HibernateException;
import com.quickrent.dto.ResponseOrderDTO;
import jakarta.transaction.Transactional;
import java.lang.StackWalker.Option;
import java.util.Objects;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.quickrent.dao.ProductDao;
import com.quickrent.dao.UserDao;
import com.quickrent.dto.OrderRequestDto;
import com.quickrent.dto.OrderResponseDto;
import com.quickrent.pojo.BillingCycle;
import com.quickrent.pojo.Order;
import com.quickrent.pojo.Product;
import com.quickrent.pojo.User;
import com.quickrent.dao.OrderDao;
import com.quickrent.dto.OrderDTO;
import com.quickrent.service.OrderService;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class OrderServiceImpl implements OrderService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserDao userDao;

	@Autowired
	private ProductDao productDao;
  
  @Autowired
  private OrderDao orderDao;

	@Override
	public OrderResponseDto saveOrder(OrderRequestDto orderRequestDto) {
		Order order = modelMapper.map(orderRequestDto, Order.class);
			order.setBillingCycle(BillingCycle.DAILY);
		
		if (Objects.nonNull(orderRequestDto.getProductId())) {
			Product product = getProductById(orderRequestDto.getProductId());
			order.setProduct(product);
			product.getOrders().add(order);
			productDao.save(product);
		}
		if (Objects.nonNull(orderRequestDto.getUserId())) {
			User user = getUserByUsdrId(orderRequestDto.getUserId());
			order.setUser(user);
			user.getOrders().add(order);
			userDao.save(user);
		}
		order = orderDao.save(order);
		OrderResponseDto response = modelMapper.map(order, OrderResponseDto.class);
		return response;
	}

	private User getUserByUsdrId(Integer userId) {
		Optional<User> user = userDao.findById(userId);
		if (user.isPresent()) {
			return user.get();
		} else {
			return null;
		}
	}

	private Product getProductById(Integer productId) {
		Optional<Product> product = productDao.findById(productId);
		if (product.isPresent()) {
			return product.get();
		} else {
			return null;
		}
	}

    @Override
    public List<OrderDTO> getOrdersByUserId(Integer userId) {
        List<Order> orders = orderDao.findOrdersByUserId(userId);
        // Convert Orders to OrderDTOs 
        return orders.stream().map(order -> {
            OrderDTO dto = new OrderDTO();
            dto.setOrderId(order.getOrderId());
            dto.setDiscount(order.getDiscount());
            dto.setTaxes(order.getTaxes());
            dto.setStartDate(order.getStartDate());
            dto.setEndDate(order.getEndDate());
            dto.setBillingCycle(order.getBillingCycle().toString());
            dto.setAddress(order.getAddress());
            dto.setCity(order.getCity());
            dto.setState(order.getState());
            dto.setCountry(order.getCountry());
            dto.setPincode(order.getPincode());
            dto.setProductName(order.getProduct().getTitle()); 
            dto.setUserName(order.getUser().getFirstname() + " " + order.getUser().getLastname()); 
            dto.setImage(order.getProduct().getImage());
            return dto;
        }).collect(Collectors.toList());
    }

    /*
     * Extra by Ashwini
    @Override
    public Order saveOrder(Order order) {
        return orderDao.save(order);
    }
    */
  
  	@Override
	  public ResponseOrderDTO getOrderData(int orderId) {
      Order order = orderDao.findById(orderId).orElseThrow(()-> new HibernateException("hi"));
      Product product = order.getProduct();
      ResponseOrderDTO orderdto = modelMapper.map(order, ResponseOrderDTO.class);
      orderdto.setProductTitle(product.getTitle());
      orderdto.setProductBrand(product.getBrandName());
      orderdto.setProductSellerName(product.getUser().getFirstname() + " " + product.getUser().getLastname());
      orderdto.setCustomerName(order.getUser().getFirstname() + " "+ order.getUser().getLastname());
      orderdto.setPhoneNo(order.getUser().getPhoneNo());
      orderdto.setCustomerEmail(order.getUser().getEmail());
      orderdto.setProductImage(product.getImage());
      return orderdto;
	  }
}
