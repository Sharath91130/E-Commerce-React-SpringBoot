//package com.kodnest.sales_backend.Service;
//
//import com.kodnest.sales_backend.Enitity.OrderItem;
//import com.kodnest.sales_backend.Repo.OrderitemRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class AdminOrderItemsService {
//
//    @Autowired
//    private OrderitemRepository orderItemRepository;
//
//    public Map<String, Object> getOrderItemsByAdminId(Integer adminId) {
//        // Fetch the order items using the repository query
//        List<OrderItem> orderItems = orderItemRepository.findOrderItemsByAdminId(adminId);
//
//        // Prepare the response map
//        Map<String, Object> response = new HashMap<>();
//        response.put("admin_id", adminId);
//
//        // Transform order items into a list of order details
//        response.put("order_items", orderItems);
//
//        return response;
//    }
//}
