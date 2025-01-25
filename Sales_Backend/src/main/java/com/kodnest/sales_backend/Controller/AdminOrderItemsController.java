//package com.kodnest.sales_backend.Controller;
//
//import com.kodnest.sales_backend.Enitity.User;
//import com.kodnest.sales_backend.Service.AdminOrderItemsService;
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/admin/orders")
//public class AdminOrderItemsController {
//
//    @Autowired
//    private AdminOrderItemsService adminOrderItemsService;
//
//    /**
//     * API endpoint to fetch order items for a specific admin ID.
//     *
//
//     */
//    @GetMapping
//    public ResponseEntity<Map<String, Object>> getOrderItemsByAdminId(HttpServletRequest request) {
//        User user = (User) request.getAttribute("authentication");
//        try {
//            // Fetch order items from the service layer
//            Map<String, Object> response = adminOrderItemsService.getOrderItemsByAdminId(user.getUserId());
//
//            // Return the response with HTTP 200 OK
//            return ResponseEntity.ok(response);
//
//        } catch (Exception e) {
//            // Handle unexpected exceptions
//            e.printStackTrace();
//            return ResponseEntity.status(500).body(Map.of("error", "An unexpected error occurred"));
//        }
//    }
//}