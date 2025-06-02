package com.quickrent.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.quickrent.pojo.BillingCycle;
import com.quickrent.pojo.Product;
import com.quickrent.pojo.User;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseOrderDTO extends BaseDTO {
	private Integer orderId;
	private Double discount;
	private Double taxes;
	private LocalDate startDate;
	private LocalDate endDate;
	private BillingCycle billingCycle;
    private String address;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private String productTitle;
    private String productBrand;
    private String productSellerName;
    private String customerName;
    private String customerEmail;
    private String phoneNo;
    private String productImage;
}
