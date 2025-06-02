package com.quickrent.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.quickrent.pojo.Order;

@Repository
public interface OrderDao extends JpaRepository<Order, Integer> { 
    // Fetch orders by user ID
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId")
    List<Order> findOrdersByUserId(@Param("userId") Integer userId);
}