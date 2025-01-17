package com.kodnest.sales_backend.Controller;


import com.kodnest.sales_backend.DTO.LoginRequest;
import com.kodnest.sales_backend.Enitity.User;
import com.kodnest.sales_backend.Service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/auth")
public class AuthController {
 private final AuthService authService;
 public AuthController(AuthService authService) {
 this.authService = authService;
 }
 @PostMapping("/login")
 public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest,
HttpServletResponse response) {
 try {
 User user = authService.authenticate(loginRequest.getUsername(),
loginRequest.getPassword());
 String token = authService.generateToken(user);
 Cookie cookie = new Cookie("authToken", token);
 cookie.setHttpOnly(true);
 cookie.setSecure(false); // Set to true if using HTTPS
 cookie.setPath("/");
 cookie.setMaxAge(3600); // 1 hour
 cookie.setDomain("localhost"); // Optional but useful
 response.addCookie(cookie);

 response.addHeader("Set-Cookie",
 String.format("authToken=%s; HttpOnly; Path=/; Max-Age=3600;SameSite=None", token));
 Map<String, Object> responseBody = new HashMap<>();
 responseBody.put("message", "Login successful");
 responseBody.put("role", user.getRole().name());
 responseBody.put("username", user.getUsername());
 return ResponseEntity.ok(responseBody);
 } catch (RuntimeException e) {
 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error",
e.getMessage()));
 }
 }
 @PostMapping("/logout")
 public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
 try {
 authService.logout(response);
 Map<String, String> responseBody = new HashMap<>();
 responseBody.put("message", "Logout successful");
 return ResponseEntity.ok(responseBody);
 } catch (RuntimeException e) {
 Map<String, String> errorResponse = new HashMap<>();
 errorResponse.put("message", "Logout failed");
 return ResponseEntity.status(500).body(errorResponse);
 }
 }
 @GetMapping("/getusername")
 public boolean getValidUsername(HttpServletRequest request){
 User userAttribute = (User) request.getAttribute("authentication");
 if(userAttribute==null){
  return false;
 }
 return true;


 }
}