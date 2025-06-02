package com.quickrent.mapper;

import com.quickrent.dto.ProductDTO;
import com.quickrent.pojo.Product;

public class ProductMapper {

    public static ProductDTO toProductDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setProductId(product.getProductId());
        dto.setTitle(product.getTitle());
        dto.setBrandName(product.getBrandName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setAdvancePayment(product.getAdvancePayment());
        dto.setCreatedOn(product.getCreatedOn());
        dto.setUpdatedOn(product.getUpdatedOn());
        dto.setModelName(product.getModelName());
        dto.setSpecifications(product.getSpecifications());
        dto.setImage(product.getImage());
        dto.setFirstName(product.getUser().getFirstname());
        dto.setLastName(product.getUser().getLastname());

        // Combine seller's first and last names
        if (product.getUser() != null) {
            dto.setSellerName(product.getUser().getFirstname() + " " + product.getUser().getLastname());
        }
        return dto;
    }
}