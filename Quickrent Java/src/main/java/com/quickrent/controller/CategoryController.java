package com.quickrent.controller;

import com.quickrent.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // API to get products by category ID
    @GetMapping("api/category/{categoryId}/products")
    public ResponseEntity<?> getProductsByCategoryId(@PathVariable int categoryId) {
    	//System.out.println("int getProductByCategoryId" + reqdto.getId());
        return ResponseEntity.ok(categoryService.getProductsByCategoryId(categoryId).getProducts());
    }
}
