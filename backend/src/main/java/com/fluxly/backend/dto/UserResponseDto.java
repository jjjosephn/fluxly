package com.fluxly.backend.dto;

import java.util.UUID;

public class UserResponseDto {
   private UUID id;
   private String email;
   private String username;
   private String name;

   public UserResponseDto(UUID id, String email, String username, String name) {
      this.id = id;
      this.email = email;
      this.username = username;
      this.name = name;
   }

   public UUID getId() { return this.id; }
   public String getEmail() { return this.email; }
   public String getUsername() { return this.username; }
   public String getName() { return this.name; }
}
