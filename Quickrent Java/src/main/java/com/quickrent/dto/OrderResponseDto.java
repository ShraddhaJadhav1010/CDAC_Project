package com.quickrent.dto;

import java.time.LocalDate;

import com.quickrent.pojo.BillingCycle;

import lombok.Data;

@Data
public class OrderResponseDto {
	
	private Integer orderId;
	/*
	private Double discount;
	private Double taxes;
	private LocalDate startDate;
	private LocalDate endDate;
	private BillingCycle billingCycle;
	private Boolean isCancelled;
	private String address;
	private String city;
	private String state;
	private String country;
	private String pincode;
	private ProductResponseDto product;
	private UserResponseDto user;
	*/
}
