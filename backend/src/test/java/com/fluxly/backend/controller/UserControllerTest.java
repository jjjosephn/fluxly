package com.fluxly.backend.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;

import com.fluxly.backend.dto.UserLoginResponseDto;
import com.fluxly.backend.dto.UserRegisterRequestDto;
import com.fluxly.backend.dto.UserResponseDto;
import com.fluxly.backend.entity.User;
import com.fluxly.backend.service.UserService;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

   private MockMvc mockMvc;

   @Mock
   private UserService userService;

   @InjectMocks
   private UserController userController;

   private ObjectMapper objectMapper;

   @BeforeEach
   void setUp() {
      mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
      objectMapper = new ObjectMapper();
   }

   @Test
   void getAllUsers_Success() throws Exception {
      UserResponseDto user1 = new UserResponseDto(UUID.randomUUID(), "user1@example.com", "user1", "User1");
      UserResponseDto user2 = new UserResponseDto(UUID.randomUUID(), "user2@example.com", "user2", "User2");

      when(userService.getAllUsers()).thenReturn(List.of(user1, user2));

      mockMvc.perform(get("/api/users/"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].username").value("user1"))
            .andExpect(jsonPath("$[1].username").value("user2"));
   }

   @Test
   void registerUser_Success() throws Exception {
      UserRegisterRequestDto request = new UserRegisterRequestDto();
      request.setEmail("user@example.com");
      request.setUsername("user");
      request.setName("User");

      UserLoginResponseDto token = new UserLoginResponseDto("dummyToken");

      when(userService.registerUser(any(UserRegisterRequestDto.class))).thenReturn(token);

      mockMvc.perform(post("/api/users/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").value("dummyToken"));
   }

}
