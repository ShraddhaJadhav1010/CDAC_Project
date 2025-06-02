package com.quickrent.pojo;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;


import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name="products")
public class Product extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="product_id")
	private Integer productId;
	
	@Column(length=100, nullable = false)
	private String title;
	
	@Column(name="brand_name", length=100)
	private String brandName;
	
	@Column(name="model_name", length=100)
	private String modelName;
	
	@Column(length=512, nullable = false)
	private String description;
	
	@Column(columnDefinition = "TEXT")
	private String specifications;
	
	@Column(nullable = false)
	private Double price;
	
	@Column(name="advance_payment", nullable = false)
	private Double advancePayment;
	
	@Column(name="is_active", columnDefinition = "BOOLEAN DEFAULT 1")
	private Boolean isActive;
	
	@Column(name="is_approved", columnDefinition = "BOOLEAN DEFAULT 0")
	private Boolean isApproved;
	
	@Column(length=255)
	private String image;
	
	//foreign keys
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name="category_id")
	private Category category;
	
	@OneToMany(mappedBy = "product")
	private List<Order> orders = new ArrayList<>();
	
}
