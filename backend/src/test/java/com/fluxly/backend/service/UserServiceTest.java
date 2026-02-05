package com.fluxly.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fluxly.backend.dto.UserLoginResponseDto;
import com.fluxly.backend.dto.UserRegisterRequestDto;
import com.fluxly.backend.dto.UserResponseDto;
import com.fluxly.backend.entity.User;
import com.fluxly.backend.repository.UserRepository;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

   @Mock
   private UserRepository userRepository;

   @Mock
   private PasswordEncoder passwordEncoder;

   @InjectMocks
   private UserService userService;

   private UserRegisterRequestDto registerRequest;
   private User mockUser;

   @BeforeEach
   void setUp() {
      registerRequest = new UserRegisterRequestDto();
      registerRequest.setEmail("test@example.com");
      registerRequest.setUsername("testuser");
      registerRequest.setName("Test User");
      registerRequest.setPassword("password123");

      mockUser = new User();
      mockUser.setEmail("test@example.com");
      mockUser.setUsername("testuser");
      mockUser.setName("Test User");
      mockUser.setPasswordHash("hashedpassword");

   }

   @Test
   void registerUser_Success() {
      // Arrange
      when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("hashedpassword");
      when(userRepository.save(any(User.class))).thenReturn(mockUser);

      ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

      // Act
      UserLoginResponseDto result = userService.registerUser(registerRequest);

      // Assert
      assertNotNull(result);

      verify(passwordEncoder, times(1)).encode("password123");
      verify(userRepository, times(1)).save(userCaptor.capture());
   }

   @Test
   void getAllUsers_Success() {
      User user1 = new User();
      user1.setEmail("user1@example.com");
      user1.setUsername("user1");
      user1.setName("User One");

      User user2 = new User();
      user2.setEmail("user2@example.com");
      user2.setUsername("user2");
      user2.setName("User Two");

      List<User> mockUsers = List.of(user1, user2);
      when(userRepository.findAll()).thenReturn(mockUsers);

      List<UserResponseDto> result = userService.getAllUsers();

      assertNotNull(result);
      assertEquals(2, result.size());
      assertEquals("user1@example.com", result.get(0).getEmail());
      assertEquals("user2@example.com", result.get(1).getEmail());
      assertEquals("user1", result.get(0).getUsername());
      assertEquals("user2", result.get(1).getUsername());
      assertEquals("User One", result.get(0).getName());
      assertEquals("User Two", result.get(1).getName());

      verify(userRepository, times(1)).findAll();
   }

}
