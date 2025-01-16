package com.kodnest.sales_backend.Repo;

import com.kodnest.sales_backend.Enitity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Integer> {
    @Query("SELECT o FROM Order o WHERE o.orderId = :razorpayOrderId")
    Optional<Order> findById(String razorpayOrderId);
}
