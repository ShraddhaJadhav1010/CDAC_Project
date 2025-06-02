package com.quickrent.service;

import com.quickrent.dto.ProductResponseFromCategoryDTO;

public interface CategoryService {

	ProductResponseFromCategoryDTO getProductsByCategoryId(Integer id);

}
