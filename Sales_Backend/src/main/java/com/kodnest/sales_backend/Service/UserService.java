package com.kodnest.sales_backend.Service;

import com.kodnest.sales_backend.Enitity.User;
import com.kodnest.sales_backend.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private  final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;



    @Autowired
    public UserService(UserRepository userRepository, User user) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }


    public User registerUser(User user) {

        // Check if username or email already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username is already taken");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already registered");
        }




            user.setPassword(passwordEncoder.encode(user.getPassword()));



        // Save the user
        return userRepository.save(user);
    }


}