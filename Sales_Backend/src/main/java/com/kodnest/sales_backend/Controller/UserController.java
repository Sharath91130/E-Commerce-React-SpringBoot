package com.kodnest.sales_backend.Controller;
import java.util.Map;

import com.kodnest.sales_backend.Enitity.User;
import com.kodnest.sales_backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
	@RequestMapping("/api/users")
	public class UserController {
    private final UserService userService;
	    @Autowired
	    public UserController(UserService userService) {
	        this.userService = userService;
	    }

		@CrossOrigin(origins = "http://localhost:5173")
		@PostMapping("/register")
	    public ResponseEntity<?> registerUser(@RequestBody User user) {
	        try {
	            User registeredUser = userService.registerUser(user);
	            return ResponseEntity.ok(Map.of("message", "User registered successfully", "user", registeredUser));
	        } catch (RuntimeException e) {
	            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
	        }
	    }
	}