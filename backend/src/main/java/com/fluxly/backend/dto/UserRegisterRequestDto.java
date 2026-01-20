package com.fluxly.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserRegisterRequestDto {
   @Email
   @NotBlank
   private String email;

   @NotBlank
   @Size(min = 2, max = 100)
   private String username;

   @NotBlank
   @Size(min = 2, max = 100)
   private String name;

   @NotBlank
   @Size(min = 8, max = 100)
   private String password;

   public String getEmail() { return email;}
   public String getUsername() { return username; }
   public String getName() { return name; }
   public String getPassword() { return password; }

   public void setEmail(String email) { this.email = email; }
   public void setUsername(String username) { this.username = username; }
   public void setName(String name) { this.name = name; }
   public void setPassword(String password) { this.password = password; }
}