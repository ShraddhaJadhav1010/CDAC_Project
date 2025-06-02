package com.quickrent.dao;


import com.quickrent.pojo.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductDao extends JpaRepository<Product, Integer> {

	@Query("SELECT p from Product p where p.isApproved = false")
	List<Product> GetAllUnverifiedProducts();

	@Query("SELECT p from Product p where p.user.usersid =?1")
	List<Product> getProductsByUserId(int id);

	@Query("SELECT p from Product p where p.category.categoryId=:categoryId AND p.isApproved=true")
	List<Product> getAvailableProducts(Integer categoryId);
}