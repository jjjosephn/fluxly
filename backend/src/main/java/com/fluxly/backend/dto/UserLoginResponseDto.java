package com.fluxly.backend.dto;

public class UserLoginResponseDto {
   private String token;

   public UserLoginResponseDto(String token) {
      this.token = token;
   }

   public String getToken() { return this.token; }

   public void setToken(String token) { this.token = token; }
}
