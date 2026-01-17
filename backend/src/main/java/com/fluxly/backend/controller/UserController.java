package com.fluxly.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fluxly.backend.dto.UserRegisterRequest;
import com.fluxly.backend.dto.UserResponse;
import com.fluxly.backend.entity.User;
import com.fluxly.backend.service.UserService;

@RestController
@RequestMapping("/api/users/")
public class UserController {

   @Autowired
   private UserService userService;

   @GetMapping
   public List<UserResponse> getAllUsers() {
      return userService.getAllUsers();
   }

   @PostMapping
   public User registerUser(@RequestBody UserRegisterRequest request) {
      return userService.registerUser(request);
   }

}
