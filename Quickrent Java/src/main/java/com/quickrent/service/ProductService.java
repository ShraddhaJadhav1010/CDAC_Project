package com.quickrent.service;

import java.util.List;

//import com.quickrent.controller.SellerProductDTO;
import com.quickrent.dto.ProductDTO;
import com.quickrent.dto.SellerProductAddDTO;
import com.quickrent.dto.SellerProductDTO;
import com.quickrent.pojo.Product;

public interface ProductService {

    List<ProductDTO> getAllProducts();

    String addNewProduct(Product product);

    String deleteProduct(Integer productId);

    ProductDTO getProductDetails(Integer productId);

    ProductDTO updateProductDetails(Integer productId, Product updatedProduct);

	List<SellerProductDTO> getUnverifiedProductDetails();

	void verifyProduct(int id);

	void addProduct(SellerProductAddDTO productDTO);

	List<SellerProductDTO> getProductsByUserId(int id);
}