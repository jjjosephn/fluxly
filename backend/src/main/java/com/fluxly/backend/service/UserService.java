package com.fluxly.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fluxly.backend.dto.UserRegisterRequestDto;
import com.fluxly.backend.dto.UserResponseDto;
import com.fluxly.backend.entity.User;
import com.fluxly.backend.repository.UserRepository;

@Service
public class UserService {
   @Autowired
   private UserRepository userRepository;

   @Autowired
   private PasswordEncoder passwordEncoder;

   private UserResponseDto toUserDto(User user) {
      return new UserResponseDto(user.getId(), user.getEmail(), user.getUsername(), user.getName());
   } 

   public User registerUser(UserRegisterRequestDto request) {
      String hashedPassword = passwordEncoder.encode(request.getPassword());
      User newUser = new User(request.getEmail(), request.getUsername(), request.getName(), hashedPassword);

      return userRepository.save(newUser);
   }

   public List<UserResponseDto> getAllUsers() {
      return userRepository.findAll().stream().map(this::toUserDto).toList();
   }


}
