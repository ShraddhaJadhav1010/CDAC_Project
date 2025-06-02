package com.quickrent.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale.Category;
import java.util.stream.Collectors;

import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quickrent.dao.CategoryDao;
import com.quickrent.dao.ProductDao;
import com.quickrent.dao.UserDao;
import com.quickrent.dto.ProductDTO;
import com.quickrent.dto.SellerProductAddDTO;
import com.quickrent.dto.SellerProductDTO;
import com.quickrent.mapper.ProductMapper;
import com.quickrent.pojo.Product;
import com.quickrent.pojo.User;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductDao productDao;
    
    @Autowired
    ModelMapper mapper;
    
    @Autowired
    UserDao userDao;
    
    @Autowired
    CategoryDao categoryDao;
    
    @Override
    public List<ProductDTO> getAllProducts() {
        return productDao.findAll()
                .stream()
                .map(ProductMapper::toProductDTO)
                .collect(Collectors.toList());
    }

    @Override
    public String addNewProduct(Product product) {
        productDao.save(product);
        return "Product added successfully!";
    }

    @Override
    public String deleteProduct(Integer productId) {
        if (!productDao.existsById(productId)) {
            throw new RuntimeException("Product not found!");
        }
        productDao.deleteById(productId);
        return "Product deleted successfully!";
    }

    @Override
    public ProductDTO getProductDetails(Integer productId) {
        Product product = productDao.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found!"));
        return ProductMapper.toProductDTO(product);
    }

    @Override
    public ProductDTO updateProductDetails(Integer productId, Product updatedProduct) {
        Product product = productDao.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found!"));

        // Update product fields
        product.setTitle(updatedProduct.getTitle());
        product.setBrandName(updatedProduct.getBrandName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setAdvancePayment(updatedProduct.getAdvancePayment());

        // Save the updated product
        productDao.save(product);

        return ProductMapper.toProductDTO(product);
    }

	@Override
	public List<SellerProductDTO> getUnverifiedProductDetails() {
		// TODO Auto-generated method stub
		List<Product> products = productDao.GetAllUnverifiedProducts();
		List<SellerProductDTO> dtos = new ArrayList<SellerProductDTO>();
		for(Product product: products) {
			SellerProductDTO dto = mapper.map(product, SellerProductDTO.class);
			dtos.add(dto);
		}
		//mapper.map(products, null)
		return dtos;
	}

	@Override
	public void verifyProduct(int id) {
		Product product = productDao.findById(id).orElseThrow();
		product.setIsApproved(true);
		productDao.save(product);
	}

	@Override
	public void addProduct(SellerProductAddDTO productDTO) {
		// TODO Auto-generated method stub
		Product product = mapper.map(productDTO, Product.class);
		com.quickrent.pojo.Category category = categoryDao.findById(productDTO.getCategoryId()).orElseThrow();
		User user = userDao.findById(productDTO.getUserId()).orElseThrow();
		product.setCategory(category);
		product.setUser(user);
		productDao.save(product);
	}

	@Override
	public List<SellerProductDTO> getProductsByUserId(int id) {
		// TODO Auto-generated method stub
		List<Product> products = productDao.getProductsByUserId(id);
		List<SellerProductDTO> dtos = new ArrayList<>();
		for(Product product: products) {
			SellerProductDTO dto = mapper.map(product, SellerProductDTO.class);
			dtos.add(dto);
		}
		return dtos;
	}
}