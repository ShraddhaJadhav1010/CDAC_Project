package com.quickrent.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OrderDTO {
    private Integer orderId;
    private Double discount;
    private Double taxes;
    private LocalDate startDate;
    private LocalDate endDate;
    private String billingCycle;
    private String address;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private String productName; // To display product details
    private String userName;    // To display user details
    private String image;
}

