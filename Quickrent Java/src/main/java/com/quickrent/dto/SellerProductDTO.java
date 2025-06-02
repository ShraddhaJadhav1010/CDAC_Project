package com.quickrent.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SellerProductDTO {
    private String title ;
    private String brandName ;
    private String modelName ;
    private String description ;
    private String specifications ;
    private double price ;
    private double advancePayment ;
    private MultipartFile imageFile; // For receiving file from client
    private String image ; // For storing image path
    private int userId ;
    private int categoryId;
    private int productId;
    private int isActive = 1;
}
