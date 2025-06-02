package com.quickrent.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {
	//orderid
	private Double discount;
	private Double taxes;
	//totalamount
	private LocalDate startDate;
	private LocalDate endDate;
	private String billingCycle;
	private Boolean isCancelled;
	private String address;
	private String city;
	private String state;
	private String country;
	private String pincode;
	private Integer productId;
	private Integer userId;

}
