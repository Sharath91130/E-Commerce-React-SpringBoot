package com.kodnest.sales_backend.Service;

import com.kodnest.sales_backend.Enitity.Category;
import com.kodnest.sales_backend.Enitity.Product;
import com.kodnest.sales_backend.Enitity.ProductImage;
import com.kodnest.sales_backend.Repo.CategoryRepository;
import com.kodnest.sales_backend.Repo.ProductImageRepository;
import com.kodnest.sales_backend.Repo.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdminProductService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final CategoryRepository categoryRepository;

    public AdminProductService(ProductRepository productRepository, ProductImageRepository productImageRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.categoryRepository = categoryRepository;
    }

    public Product addProductWithImage(String name, String description, Double price, Integer stock, Integer categoryId, String imageUrl,Integer id) {
        // Validate the category
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isEmpty()) {
            throw new IllegalArgumentException("Invalid category ID");
        }

        // Create and save the product
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(BigDecimal.valueOf(price));
        product.setStock(stock);
        product.setCategory(category.get());
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        product.setAdmin_id(id);

        Product savedProduct = productRepository.save(product);

        // Create and save the product image
        if (imageUrl != null && !imageUrl.isEmpty()) {
            ProductImage productImage = new ProductImage();
            productImage.setProduct(savedProduct);
            productImage.setImageUrl(imageUrl);
            productImageRepository.save(productImage);
        } else {
            throw new IllegalArgumentException("Product image URL cannot be empty");
        }

        return savedProduct;
    }

    public void deleteProduct(Integer productId) {
        // Check if the product exists
        if (!productRepository.existsById(productId)) {
            throw new IllegalArgumentException("Product not found");
        }

        // Delete associated product images
        productImageRepository.deleteByProductId(productId);

        // Delete the product
        productRepository.deleteById(productId);
    }
    public List<Product> getProduct(Integer Admin_id){
        List<Product> productList=productRepository.findProductsByUserId(Admin_id);

        return  productList;
    }
    public Product updateProduct(Integer productId, Product updatedProduct,String imageUrl) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();

            existingProduct.setName(updatedProduct.getName());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setStock(updatedProduct.getStock());
            //existingProduct.setImages(updatedProduct.getImages());
            existingProduct.setUpdatedAt(LocalDateTime.now());
            if (imageUrl != null && !imageUrl.isEmpty()) {
                ProductImage productImage = new ProductImage();
                productImage.setProduct(existingProduct);
                productImage.setImageUrl(imageUrl);
                productImageRepository.save(productImage);
            } else {
                throw new IllegalArgumentException("Product image URL cannot be empty");
            }



            return productRepository.save(existingProduct);

        } else {
            throw new RuntimeException("Product with ID " + productId + " not found.");
        }
    }
    @Transactional
    protected void deleteProduct(int  productId) {
        if (productRepository.existsById(productId)) {
            productImageRepository.deleteByProductId(productId);
            productRepository.deleteById(productId);
        } else {
            throw new RuntimeException("Product with ID " + productId + " not found.");
        }
    }
}