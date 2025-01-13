package com.kodnest.sales_backend.Repo;

import com.kodnest.sales_backend.Enitity.JWTToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JWTTokenRepository extends JpaRepository<JWTToken, Integer> {


    Optional<JWTToken> findByToken(String token);

}