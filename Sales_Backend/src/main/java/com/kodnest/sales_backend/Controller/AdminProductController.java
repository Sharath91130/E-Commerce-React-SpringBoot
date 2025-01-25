package com.kodnest.sales_backend.Controller;

import com.kodnest.sales_backend.Enitity.Category;
import com.kodnest.sales_backend.Enitity.Product;
import com.kodnest.sales_backend.Enitity.User;
import com.kodnest.sales_backend.Service.AdminProductService;
import com.kodnest.sales_backend.Service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/products")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AdminProductController {

    private final AdminProductService adminProductService;
    private final ProductService productService;



    public AdminProductController(AdminProductService adminProductService,ProductService productService) {
        this.adminProductService = adminProductService;
        this.productService=productService;
    }
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody Map<String, Object> productRequest, HttpServletRequest request) {
        try {
            User authenticatedUser = (User) request.getAttribute("authentication");
            Integer id=authenticatedUser.getUserId();
            String name = (String) productRequest.get("name");
            String description = (String) productRequest.get("description");
            Double price = Double.valueOf(String.valueOf(productRequest.get("price")));
            Object stockobj = productRequest.get("stock");
           Object categoryIdobj = productRequest.get("categoryId");
            String imageUrl = (String) productRequest.get("imageUrl");

            Integer stock=Integer.parseInt(stockobj.toString());
            Integer categoryId=Integer.parseInt(categoryIdobj.toString());

            Product addedProduct = adminProductService.addProductWithImage(name, description, price, stock, categoryId, imageUrl,id);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteProduct(@RequestBody Map<String, Integer> requestBody) {
        try {
            Integer productId = requestBody.get("productId");
            adminProductService.deleteProduct(productId);
            return ResponseEntity.status(HttpStatus.OK).body("Product deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/get")
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
            List<Product> products = adminProductService.getProduct(authenticatedUser.getUserId());

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
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update/{productId}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Integer productId,
            @RequestBody Map<String, Object> request) {
        Product updatedProduct = new Product();
        updatedProduct.setName((String) request.get("name"));
        updatedProduct.setPrice(BigDecimal.valueOf((Integer) request.get("price")));
        updatedProduct.setDescription((String) request.get("description"));
        updatedProduct.setStock((Integer) request.get("stock"));
        updatedProduct.setCategory((Category) request.get("Category"));

        String newImageUrls = (String) request.get("images");

        Product product = adminProductService.updateProduct(productId, updatedProduct, newImageUrls);
        return ResponseEntity.ok(product);
    }
    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer productId) {
        adminProductService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }

}