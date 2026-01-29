package com.fluxly.backend.exception;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;

import org.springframework.http.HttpStatus;

public class GlobalExceptionHandlerTest {

   private GlobalExceptionHandler handler = new GlobalExceptionHandler();

   @Test
   void handleDuplicateEmailException_Success() {
      Throwable root = new RuntimeException("uk_users_email constraint violation");
      DataIntegrityViolationException ex = mock(DataIntegrityViolationException.class);
      when(ex.getRootCause()).thenReturn(root);

      ResponseEntity<String> response = handler.handleDataIntegrityViolationException(ex);

      assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
      assertEquals("Email already exists.", response.getBody());
   }

   @Test
   void handleDuplicateUsernameException_Success() {
      Throwable root = new RuntimeException("uk_users_username constraint violation");
      DataIntegrityViolationException ex = mock(DataIntegrityViolationException.class);
      when(ex.getRootCause()).thenReturn(root);

      ResponseEntity<String> response = handler.handleDataIntegrityViolationException(ex);

      assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
      assertEquals("Username already exists.", response.getBody());
   }
}
