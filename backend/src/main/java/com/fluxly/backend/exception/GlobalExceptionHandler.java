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

      if (ex.getRootCause() != null && ex.getRootCause().getMessage().contains("uk_users_email")) {
         message = "Email already exists.";
      } else if (ex.getRootCause() != null && ex.getRootCause().getMessage().contains("uk_users_username")) {
         message = "Username already exists.";
      }

      return ResponseEntity.status(HttpStatus.CONFLICT).body(message);
   }
}
