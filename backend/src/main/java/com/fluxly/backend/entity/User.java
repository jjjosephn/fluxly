package com.fluxly.backend.entity;
import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
   name = "users",
   uniqueConstraints = {
      @UniqueConstraint(name = "uk_users_email", columnNames = "email"),
      @UniqueConstraint(name = "uk_users_username", columnNames = "username")
   }
)
public class User {
   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   private UUID id;

   @Column(nullable = false, unique = true)
   private String email;

   @Column(nullable = false, unique = true)
   private String username;

   @Column(nullable = false)
   private String name;

   @Column(nullable = false)
   private String passwordHash;

   @Column(nullable = false, updatable = false)
   private Instant createdAt;

   public User() {}

   public User(String email, String username,String name, String passwordHash) {
      this.email = email;
      this.username = username;
      this.name = name;
      this.passwordHash = passwordHash;
      this.createdAt = Instant.now();
   }
   
   public UUID getId() { return this.id; }
   public String getEmail() { return this.email; }
   public String getUsername() { return this.username; }
   public String getName() { return this.name; }
   public Instant getCreatedAt() { return this.createdAt; }

   public void setEmail(String email) { this.email = email; }
   public void setUsername(String username) { this.username = username; }
   public void setName(String name) { this.name = name; }
   public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
}
