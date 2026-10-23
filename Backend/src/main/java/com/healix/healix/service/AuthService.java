
package com.healix.healix.service;

import com.healix.healix.dto.AuthResponse;
import com.healix.healix.dto.GoogleAuthRequest;
import com.healix.healix.dto.LoginRequest;
import com.healix.healix.dto.RegisterRequest;
import com.healix.healix.security.JwtService;
import com.healix.healix.user.User;
import com.healix.healix.user.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final GoogleTokenService googleTokenService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            GoogleTokenService googleTokenService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.googleTokenService = googleTokenService;
    }

    public boolean isEmailRegistered(String email) {
        return userRepository.existsByEmailIgnoreCase(email);
    }

    public AuthResponse registerUser(RegisterRequest request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException(
                    "Password and confirm password do not match");
        }

        if (isEmailRegistered(request.getEmail())) {
            throw new IllegalArgumentException(
                    "Email already registered");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        return new AuthResponse(
                "Registration successful",
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail());
    }

    public AuthResponse loginUser(LoginRequest request) {

        User user = userRepository
                .findByEmailIgnoreCase(request.getEmail())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException(
                    "Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                "Login successful",
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                token);
    }

    public AuthResponse googleLogin(GoogleAuthRequest request) {

        if (request == null
                || request.getCredential() == null
                || request.getCredential().isBlank()) {
            throw new IllegalArgumentException(
                    "Google credential is required");
        }

        GoogleIdToken.Payload payload;

        try {
            payload = googleTokenService.verifyToken(
                    request.getCredential());
        } catch (GeneralSecurityException | IOException exception) {
            throw new IllegalArgumentException(
                    "Unable to verify Google token");
        }

        String email = payload.getEmail();

        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException(
                    "Google account email is missing");
        }

        User user = userRepository
                .findByEmailIgnoreCase(email)
                .orElse(null);

        if (user == null) {
            String fullName = (String) payload.get("name");

            if (fullName == null || fullName.isBlank()) {
                fullName = email.substring(0, email.indexOf('@'));
            }

            user = new User();
            user.setFullName(fullName);
            user.setEmail(email);

            // Google users do not choose a HEALIX password here.
            user.setPassword(
                    passwordEncoder.encode(UUID.randomUUID().toString()));

            user = userRepository.save(user);
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                "Google login successful",
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                token);
    }
}
