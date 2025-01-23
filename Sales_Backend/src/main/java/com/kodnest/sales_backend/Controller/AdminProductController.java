package com.kodnest.sales_backend.Controller;

import com.kodnest.sales_backend.Enitity.Product;
import com.kodnest.sales_backend.Enitity.User;
import com.kodnest.sales_backend.Service.AdminProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/products")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AdminProductController {

    private final AdminProductService adminProductService;

    public AdminProductController(AdminProductService adminProductService) {
        this.adminProductService = adminProductService;
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
}