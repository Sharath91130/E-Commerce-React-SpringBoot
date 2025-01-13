package com.kodnest.sales_backend.filter;//package com.example.demo.filter;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .authorizeHttpRequests(authorize -> authorize
//                .anyRequest().authenticated() // Adjust rules as needed
//            )
//            .formLogin() // Enable form-based login
//            .and()
//            .httpBasic(); // Enable basic authentication
//        return http.build();
//    }
//}
