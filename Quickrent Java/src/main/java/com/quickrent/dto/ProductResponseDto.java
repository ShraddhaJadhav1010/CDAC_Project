package com.quickrent.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class ProductResponseDto {
	private Integer productId;

	private String title;

	private String brandName;

	private String modelName;

	private String description;

	private String specifications;

	private Double price;

	private Double advancePayment;

	private Boolean isActive;

	private Boolean isApproved;
}
