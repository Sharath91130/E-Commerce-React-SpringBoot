package com.kodnest.sales_backend.Repo;

import com.kodnest.sales_backend.Enitity.JWTToken;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface JWTTokenRepository extends JpaRepository<JWTToken, Integer> {


    Optional<JWTToken> findByToken(String token);
    @Query("SELECT t FROM JWTToken t WHERE t.user.userId = :userId")
    JWTToken findByUserId(@Param("userId") int userId);

    // Custom query to delete tokens by user ID
    @Modifying
    @Transactional
    @Query("DELETE FROM JWTToken t WHERE t.user.userId = :userId")
    void deleteByUserId(@Param("userId") int userId);

}