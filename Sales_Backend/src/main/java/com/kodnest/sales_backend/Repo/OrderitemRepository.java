package com.kodnest.sales_backend.Repo;

import com.kodnest.sales_backend.Enitity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderitemRepository extends JpaRepository<OrderItem,Integer> {
    @Query("SELECT oi FROM OrderItem oi WHERE oi.order.orderId = :orderId")
    List<OrderItem> findByOrderId(String orderId);
}
