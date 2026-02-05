package com.fluxly.backend.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

   @ExceptionHandler(DuplicateResourceException.class)
   public ResponseEntity<String> handleDuplicateResourceException(DuplicateResourceException ex) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
   }

   @ExceptionHandler(DataIntegrityViolationException.class)
   public ResponseEntity<String> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
      String message = "Email or username already exists.";
      Throwable rootCause = ex.getRootCause();
      String rootMessage = rootCause != null ? rootCause.getMessage() : null;

      if (rootMessage != null && rootMessage.contains("uk_users_username")) {
         message = "Username already exists.";
      } else if (rootMessage != null && rootMessage.contains("uk_users_email")) {
         message = "Email already exists.";
      }

      return ResponseEntity.status(HttpStatus.CONFLICT).body(message);
   }

   @ExceptionHandler(InvalidCredentialsException.class)
   public ResponseEntity<String> handleInvalidCredentialsException(InvalidCredentialsException ex) {
      String message = "Invalid email, username, or password.";
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
   }
}
