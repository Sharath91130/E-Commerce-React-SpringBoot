package com.kodnest.sales_backend.Controller;

import com.kodnest.sales_backend.Enitity.Product;
import com.kodnest.sales_backend.Enitity.User;
import com.kodnest.sales_backend.Service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getProducts(
            @RequestParam(required = false) String category,
            HttpServletRequest request) {
        try {
            Object userAttribute = request.getAttribute("authentication");
            if (userAttribute == null || !(userAttribute instanceof User)) {
                // Handle the case where the attribute is missing or not of the expected type
                throw new IllegalStateException("Authenticated user not found in the request");
            }
            User authenticatedUser = (User) userAttribute;

            // Fetch products based on the category filter
            List<Product> products = productService.getProductsByCategory(category);

            // Build the response
            Map<String, Object> response = new HashMap<>();

            // Add user info
            Map<String, String> userInfo = new HashMap<>();
            userInfo.put("name", authenticatedUser.getUsername());
            userInfo.put("role", authenticatedUser.getRole().name());
            response.put("user", userInfo);

            // Add product details
            List<Map<String, Object>> productList = new ArrayList<>();
            for (Product product : products) {
                Map<String, Object> productDetails = new HashMap<>();
                productDetails.put("product_id", product.getProductId());
                productDetails.put("name", product.getName());
                productDetails.put("description", product.getDescription());
                productDetails.put("price", product.getPrice());
                productDetails.put("stock", product.getStock());

                // Fetch product images
                List<String> images = productService.getProductImages(product.getProductId());
                productDetails.put("images", images);

                productList.add(productDetails);
            }
            response.put("products", productList);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
