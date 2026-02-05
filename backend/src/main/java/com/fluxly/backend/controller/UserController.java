package com.fluxly.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fluxly.backend.dto.UserLoginRequestDto;
import com.fluxly.backend.dto.UserLoginResponseDto;
import com.fluxly.backend.dto.UserRegisterRequestDto;
import com.fluxly.backend.dto.UserResponseDto;
import com.fluxly.backend.entity.User;
import com.fluxly.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users/")
public class UserController {

   @Autowired
   private UserService userService;

   @GetMapping
   public List<UserResponseDto> getAllUsers() {
      return userService.getAllUsers();
   }

   @PostMapping
   public UserLoginResponseDto registerUser(@RequestBody UserRegisterRequestDto request) {
      return userService.registerUser(request);
   }

   @PostMapping("/signin")
   public UserLoginResponseDto signinUser(@Valid @RequestBody UserLoginRequestDto request) {
      return userService.signin(request);
   }

}
