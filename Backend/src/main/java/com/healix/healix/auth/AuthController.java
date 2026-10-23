package com.healix.healix.auth;

import com.healix.healix.dto.AuthResponse;
import com.healix.healix.dto.LoginRequest;
import com.healix.healix.dto.RegisterRequest;
import com.healix.healix.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse registerUser(
            @Valid @RequestBody RegisterRequest request) {
        return authService.registerUser(request);
    }


    @PostMapping("/login")
    public AuthResponse loginUser(@Valid @RequestBody LoginRequest request) {
        return authService.loginUser(request);
    }

}