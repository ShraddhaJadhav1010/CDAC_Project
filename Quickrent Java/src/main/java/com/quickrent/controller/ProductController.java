package com.quickrent.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.quickrent.dto.ApiResponse;
import com.quickrent.dto.ProductDTO;
import com.quickrent.dto.SellerProductAddDTO;
import com.quickrent.dto.SellerProductDTO;
import com.quickrent.pojo.Product;
import com.quickrent.service.ImageService;
import com.quickrent.service.ProductService;

@RestController
@RequestMapping("api/product")
@CrossOrigin(origins = "*")
public class ProductController {
	@Autowired
	private ImageService imageService;

    @Autowired
    private ProductService productService;

    public ProductController() {
        System.out.println("in ctor " + getClass());
    }

    // Get a product by ID
    @GetMapping("/{productId}")
    public ResponseEntity<?> getProductDetails(@PathVariable Integer productId) {
        System.out.println("in get product details " + productId);
        try {
            return ResponseEntity.ok(productService.getProductDetails(productId));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
    
    @GetMapping("getall/unverified")
    public ResponseEntity<?> getUnverifiedProductDetails() {
    	List<SellerProductDTO> dtos = productService.getUnverifiedProductDetails();
    	return ResponseEntity.ok(dtos);
    }
    
    @PatchMapping("/verify/{id}")
    public ResponseEntity<?> verifyProduct(@PathVariable Integer id) {
    	productService.verifyProduct(id);
    	return ResponseEntity.ok("Product Verified Successfully");
    }
    
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestParam("imageFile") MultipartFile imageFile,
                                        @ModelAttribute SellerProductAddDTO productDTO) {
        if (imageFile.isEmpty()) {
            return ResponseEntity.badRequest().body("{\"errors\": {\"Image\": [\"Image file is required.\"]}}");
        }

        try {
            String imagePath = imageService.saveImage(imageFile);
            productDTO.setImage(imagePath);
            productService.addProduct(productDTO);
            return ResponseEntity.ok("Product Added Successfully");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("{\"errors\": {\"Image\": [\"Failed to save image.\"]}}");
        }
    }
    
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getProductsByUserId(@PathVariable int id){
    	List<SellerProductDTO> products = productService.getProductsByUserId(id);
    	return ResponseEntity.ok(products);
    }
    
}