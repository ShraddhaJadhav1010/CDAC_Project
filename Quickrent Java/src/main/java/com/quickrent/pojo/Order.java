package com.quickrent.pojo;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name="orders")

public class Order extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="order_id")
	private Integer orderId;
	
	@Column(columnDefinition = "DOUBLE DEFAULT 0")
	private Double discount;
	
	@Column(columnDefinition = "DOUBLE DEFAULT 0")
	private Double taxes;
	
	@Column(name="start_date", nullable = false)
	private LocalDate startDate;
	
	@Column(name="end_date", nullable = false)
	private LocalDate endDate;
	
	@Enumerated(EnumType.STRING)
	@Column(name="billing_cycle", length = 20, nullable = false)
	private BillingCycle billingCycle;

	@Column(name="is_cancelled", columnDefinition = "BOOLEAN DEFAULT 0")
	private Boolean isCancelled;
	
    @Column(length = 255, nullable = false)
    private String address;

    @Column(length = 100, nullable = false)
    private String city;

    @Column(length = 100, nullable = false)
    private String state;

    @Column(length = 100, nullable = false)
    private String country;

    @Column(length = 10, nullable = false)
    private String pincode;
	
	//Foreign keys
	@ManyToOne
	@JoinColumn(name="product_id")
	private Product product;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
}
