
package com.healix.healix.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import com.healix.healix.dto.AuthResponse;
import com.healix.healix.security.JwtService;
import com.healix.healix.user.User;
import com.healix.healix.user.UserRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class GoogleAuthService {

    @Value("${healix.google.client-id}")
    private String clientId;

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public GoogleAuthService(
            UserRepository userRepository,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public AuthResponse loginWithGoogle(String credential)
            throws GeneralSecurityException, IOException {

        if (credential == null || credential.isBlank()) {
            throw new IllegalArgumentException(
                    "Google credential is required.");
        }

        GoogleIdTokenVerifier verifier =
                new GoogleIdTokenVerifier.Builder(
                        new NetHttpTransport(),
                        GsonFactory.getDefaultInstance())
                        .setAudience(Collections.singletonList(clientId))
                        .build();

        GoogleIdToken idToken = verifier.verify(credential);

        if (idToken == null) {
            throw new IllegalArgumentException(
                    "Invalid Google credential.");
        }

        GoogleIdToken.Payload payload = idToken.getPayload();

        if (!Boolean.TRUE.equals(payload.getEmailVerified())) {
            throw new IllegalArgumentException(
                    "Google email is not verified.");
        }

        String email = payload.getEmail().trim().toLowerCase();
        String fullName = (String) payload.get("name");

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setFullName(
                            fullName == null ? "" : fullName);
                    newUser.setVerified(true);
                    newUser.setOnboardingStatus("PENDING");
                    return newUser;
                });

        user.setVerified(true);

        if (user.getFullName() == null
                || user.getFullName().isBlank()) {
            user.setFullName(fullName == null ? "" : fullName);
        }

        user = userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());

        AuthResponse response = new AuthResponse(
                "Google login successful",
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                token
        );

        response.setOnboardingStatus(user.getOnboardingStatus());

        return response;
    }
}
