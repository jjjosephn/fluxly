package com.fluxly.backend.config;

import java.util.UUID;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;

import com.fluxly.backend.entity.User;
import com.fluxly.backend.repository.UserRepository;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter{

   private final JwtService jwtService;
   private final UserRepository userRepository;

   public JwtAuthenticationFilter(JwtService jwtService, UserRepository userRepository) {
      this.jwtService = jwtService;
      this.userRepository = userRepository;
   }

   @Override
   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
      String authHeader = request.getHeader("Authorization");
      if (authHeader != null && authHeader.startsWith("Bearer ")) {
         String token = authHeader.substring(7);

         try {
            String userId = jwtService.validateTokenAndGetUserId(token);
            User user = userRepository.findById(UUID.fromString(userId)).orElse(null);

            if (user != null) {
               UsernamePasswordAuthenticationToken authToken = 
                  new UsernamePasswordAuthenticationToken(user, null, null);
               SecurityContextHolder.getContext().setAuthentication(authToken);
            }
         } catch (Exception e) {

         }
      }

      filterChain.doFilter(request, response);
         
   }

}
