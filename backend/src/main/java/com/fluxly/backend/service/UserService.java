package com.fluxly.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fluxly.backend.dto.UserRegisterRequest;
import com.fluxly.backend.dto.UserResponse;
import com.fluxly.backend.entity.User;
import com.fluxly.backend.repository.UserRepository;

@Service
public class UserService {
   @Autowired
   private UserRepository userRepository;

   @Autowired
   private PasswordEncoder passwordEncoder;

   public User registerUser(UserRegisterRequest request) {
      String hashedPassword = passwordEncoder.encode(request.getPassword());
      User newUser = new User(request.getEmail(), request.getUsername(), request.getName(), hashedPassword);

      return userRepository.save(newUser);
   }

   public List<UserResponse> getAllUsers() {
      return userRepository.findAll().stream().map(UserResponse::fromUser).toList();
   }

}
