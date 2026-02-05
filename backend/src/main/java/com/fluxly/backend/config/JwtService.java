package com.fluxly.backend.config;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fluxly.backend.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Service
public class JwtService {
   
   private Key key;

   private final long expirationMillis = 1000 * 60 * 60 * 24; 

   @Value("${jwt.secret:}")
   private String jwtSecret;

   @PostConstruct
   public void init() {
      String secret = System.getenv("JWT_SECRET_KEY");

      if (secret == null || secret.isEmpty()) {
         if (jwtSecret == null || jwtSecret.isEmpty()) {
            throw new IllegalStateException("JWT secret not configured in environment variables or application properties.");
         }
         secret = jwtSecret;
      }

      byte[] keyBytes = Base64.getDecoder().decode(secret);
      this.key = Keys.hmacShaKeyFor(keyBytes);
   }

   public String generateToken(User user) {
      return Jwts.builder()
            .setSubject(user.getId().toString())
            .claim("username", user.getUsername())
            .claim("name", user.getName())
            .claim("email", user.getEmail())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
            .signWith(key)
            .compact();
   }

   public String validateTokenAndGetUserId(String token) {
      return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
   }

}
