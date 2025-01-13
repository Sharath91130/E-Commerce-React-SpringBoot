package com.kodnest.sales_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration;


@SpringBootApplication(exclude = {ManagementWebSecurityAutoConfiguration.class})
public class SalesBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SalesBackendApplication.class, args);
    }

}
