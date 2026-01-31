package com.fluxly.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class UserLoginRequestDto {

   @NotBlank
   private String emailOrUsername;

   @NotBlank
   private String password;

   public String getEmailOrUsername() { return this.emailOrUsername; }
   public String getPassword() { return this.password; }

   public void setEmailOrUsername(String emailOrUsername) { this.emailOrUsername = emailOrUsername; }
   public void setPassword(String password) { this.password = password; }

}
