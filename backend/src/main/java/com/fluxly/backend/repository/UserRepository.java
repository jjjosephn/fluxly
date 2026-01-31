package com.fluxly.backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fluxly.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
   Optional<User> findByEmail(String email);
   Optional<User> findByUsername(String username);

   default Optional<User> findByEmailOrUsername(String emailOrUsername) {
      Optional<User> user = findByEmail(emailOrUsername);
      if (user.isPresent()) {
         return user;
      } else {
         return findByUsername(emailOrUsername);
      }
   }
}
