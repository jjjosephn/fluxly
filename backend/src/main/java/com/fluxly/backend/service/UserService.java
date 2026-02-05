package com.fluxly.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fluxly.backend.config.JwtService;
import com.fluxly.backend.dto.UserLoginRequestDto;
import com.fluxly.backend.dto.UserLoginResponseDto;
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

   @Autowired
   private JwtService jwtService;

   private UserResponseDto toUserDto(User user) {
      return new UserResponseDto(user.getId(), user.getEmail(), user.getUsername(), user.getName());
   } 

   public UserLoginResponseDto registerUser(UserRegisterRequestDto request) {
      String hashedPassword = passwordEncoder.encode(request.getPassword());
      User newUser = new User(request.getEmail(), request.getUsername(), request.getName(), hashedPassword);

      User savedUser = userRepository.save(newUser);

      String token = jwtService.generateToken(savedUser);

      return new UserLoginResponseDto(token);
   }

   public List<UserResponseDto> getAllUsers() {
      return userRepository.findAll().stream().map(this::toUserDto).toList();
   }

   public UserLoginResponseDto signin(UserLoginRequestDto request) {
      Optional<User> userOpt = userRepository.findByEmailOrUsername(request.getEmailOrUsername());

      if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPasswordHash())) {
         throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email/username or password");
      }

      User user = userOpt.get();
      String token = jwtService.generateToken(user);

      return new UserLoginResponseDto(token);
   }

}
