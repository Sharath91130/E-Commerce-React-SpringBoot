package com.kodnest.sales_backend.Repo;

import com.kodnest.sales_backend.Enitity.CartItem;
import com.kodnest.sales_backend.Enitity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    // Custom query to count cart items for a given userId
    @Query("SELECT COUNT(c) FROM CartItem c WHERE c.user.userId = :userId")
  int countCartItemsByUserId(@Param("userId") int userId) ;



    // Custom query to fetch userId by username (assumes relationship exists)
    @Query("SELECT u.userId FROM User u WHERE u.username = :username")
    int findUserIdByUsername(@Param("username") String username);

    @Query("UPDATE CartItem c SET c.quantity = :quantity WHERE c.id = :cartItemId")
    void updateCartItemQuantity(int cartItemId, int quantity);
}