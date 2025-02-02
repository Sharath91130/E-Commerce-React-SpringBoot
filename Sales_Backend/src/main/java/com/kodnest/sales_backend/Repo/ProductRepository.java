package com.kodnest.sales_backend.Repo;

import com.kodnest.sales_backend.Enitity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory_CategoryId(Integer categoryId);
    @Query("SELECT p.category.categoryName FROM Product p WHERE p.productId = :productId")
    String findCategoryNameByProductId(int productId);
    @Query("SELECT p FROM Product p WHERE p.admin_id = :userId")
    List<Product> findProductsByUserId(@Param("userId") int userId);


}