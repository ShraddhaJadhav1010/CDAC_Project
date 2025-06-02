package com.quickrent.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO extends BaseDTO {
    private Integer productId;
    private String title;
    private String brandName;
    private String modelName;
    private String description;
    private String specifications;
    private Double price;
    private Double advancePayment;
    private String sellerName; 
    private String image;
    private String firstName;
    private String lastName;
}
