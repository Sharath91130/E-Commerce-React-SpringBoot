package com.kodnest.sales_backend.filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Apply CORS to your API endpoints
                        .allowedOrigins("http://localhost:5173") // Allow requests from frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed methods
                        .allowCredentials(true); // Allow cookies and authentication headers
            }
        };
    }
}
