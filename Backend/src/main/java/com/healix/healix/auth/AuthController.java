package com.healix.healix.auth;

import com.healix.healix.dto.AuthResponse;
import com.healix.healix.dto.GoogleAuthRequest;
import com.healix.healix.dto.LoginRequest;
import com.healix.healix.dto.RegisterRequest;
import com.healix.healix.dto.ResendCodeRequest;
import com.healix.healix.dto.VerifyEmailRequest;
import com.healix.healix.service.AuthService;
import com.healix.healix.service.GoogleAuthService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final GoogleAuthService googleAuthService;

    public AuthController(
            AuthService authService,
            GoogleAuthService googleAuthService) {
        this.authService = authService;
        this.googleAuthService = googleAuthService;
    }

    @PostMapping("/register")
    public AuthResponse registerUser(
            @Valid @RequestBody RegisterRequest request) {
        return authService.registerUser(request);
    }

    @PostMapping("/login")
    public AuthResponse loginUser(
            @Valid @RequestBody LoginRequest request) {
        return authService.loginUser(request);
    }

    @PostMapping("/verify-email")
    public AuthResponse verifyEmail(
            @Valid @RequestBody VerifyEmailRequest request) {
        return authService.verifyEmail(request);
    }

    @PostMapping("/resend-code")
    public Map<String, String> resendCode(
            @Valid @RequestBody ResendCodeRequest request) {
        authService.resendCode(request);
        return Map.of(
                "message",
                "If the account exists, a new code was sent"
        );
    }

    @PostMapping("/google")
    public AuthResponse googleLogin(
            @Valid @RequestBody GoogleAuthRequest request)
            throws GeneralSecurityException, IOException {
        return googleAuthService.loginWithGoogle(
                request.getCredential()
        );
    }
}