package com.fluxly.backend.dto;

import java.util.UUID;

import com.fluxly.backend.entity.User;

public class UserResponse {
   private UUID id;
   private String email;
   private String username;
   private String name;

   public UserResponse(UUID id, String email, String username, String name) {
      this.id = id;
      this.email = email;
      this.username = username;
      this.name = name;
   }

   public static UserResponse fromUser(User user) {
      return new UserResponse(
         user.getId(),
         user.getEmail(),
         user.getUsername(),
         user.getName()
      );
   }


}
