package com.quickrent.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;



@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "categories") // Maps this class to the "categories" table in the database

public class Category extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented primary key
    @Column(name = "category_id") // Maps to the "category_id" column
    private Integer categoryId;

    public List<Product> getProducts() {
		return products;
	}

	@Column(name = "category_name", nullable = false, length = 100) // Maps to the "category_name" column
    private String categoryName;

    /*@Column(name = "description", length = 255) // Maps to the "description" column
    private String description;

    @Column(name = "parent_category", length = 100) // Maps to the "parent_category" column
    private String parentCategory; */

    // Relationship with Products
    @OneToMany(mappedBy = "category")
    private List<Product> products = new ArrayList<>();

    // Parameterized constructor
    public Category(String categoryName, String description, String parentCategory) {
        this.categoryName = categoryName;
        //this.description = description;
        //this.parentCategory = parentCategory;
    }
}
