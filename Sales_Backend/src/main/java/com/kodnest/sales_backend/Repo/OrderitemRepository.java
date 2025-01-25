package com.kodnest.sales_backend.Repo;

import com.kodnest.sales_backend.Enitity.OrderItem;
import com.kodnest.sales_backend.Enitity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderitemRepository extends JpaRepository<OrderItem,Integer> {
    @Query("SELECT oi FROM OrderItem oi WHERE oi.order.orderId = :orderId")
    List<OrderItem> findByOrderId(String orderId);
//    @Query("SELECT o.orderId, o.userId, oi.productId, oi.quantity, oi.pricePerUnit, oi.totalPrice " +
//            "FROM OrderItem oi " +
//            "LEFT JOIN oi.order o " +
//            "WHERE o.userId = :userId")
@Query("SELECT oi FROM OrderItem oi WHERE oi.order.userId = :userId AND oi.order.status = :status")
    List<OrderItem> findSuccessfulOrderItemsByUserId(@Param("userId") Integer userId, @Param("status") OrderStatus status);


//    @Query("SELECT oi.productId, oi.quantity, oi.pricePerUnit, oi.totalPrice, oi.order " +
//            "FROM OrderItem oi " +
//            "LEFT JOIN Product p ON oi.productId = p.productId AND p.admin_id = :adminId " +
//            "WHERE p.admin_id = :adminId")


}
