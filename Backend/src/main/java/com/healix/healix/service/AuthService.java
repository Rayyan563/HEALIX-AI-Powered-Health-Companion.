package com.healix.healix.service;

import com.healix.healix.dto.*;
import com.healix.healix.security.JwtService;
import com.healix.healix.user.User;
import com.healix.healix.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private static final int CODE_EXPIRY_MINUTES = 10;
    private static final int MAX_ATTEMPTS = 5;
    private static final int RESEND_COOLDOWN_SECONDS = 60;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final SecureRandom random = new SecureRandom();

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    public AuthResponse registerUser(RegisterRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmailIgnoreCase(email).orElse(null);
        if (user != null && user.isVerified()) {
            throw new IllegalArgumentException("Email already registered");
        }
        if (user == null) {
            user = new User();
            user.setEmail(email);
        }

        user.setFullName(request.getFullName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setVerified(false);

        issueAndSendCode(user);

        return new AuthResponse(
                "Verification code sent to your email",
                user.getId(), user.getFullName(), user.getEmail());
    }

    public AuthResponse verifyEmail(VerifyEmailRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.getEmail().trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid code"));

        if (user.isVerified()) {
            throw new IllegalArgumentException("Email already verified. Please log in.");
        }
        if (user.getVerificationCodeHash() == null
                || user.getVerificationExpiresAt() == null
                || Instant.now().isAfter(user.getVerificationExpiresAt())) {
            throw new IllegalArgumentException("Code expired. Please request a new one.");
        }
        if (user.getVerificationAttempts() >= MAX_ATTEMPTS) {
            throw new IllegalArgumentException("Too many attempts. Please request a new code.");
        }
        if (!passwordEncoder.matches(request.getCode(), user.getVerificationCodeHash())) {
            user.setVerificationAttempts(user.getVerificationAttempts() + 1);
            userRepository.save(user);
            throw new IllegalArgumentException("Invalid code");
        }

        user.setVerified(true);
        user.setVerificationCodeHash(null);
        user.setVerificationExpiresAt(null);
        user.setVerificationSentAt(null);
        user.setVerificationAttempts(0);
        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse("Email verified", user.getId(),
                user.getFullName(), user.getEmail(), token);
    }

    public void resendCode(ResendCodeRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.getEmail().trim())
                .orElse(null);
        // Same response whether or not the account exists, so emails can't be probed.
        if (user == null || user.isVerified()) {
            return;
        }
        if (user.getVerificationSentAt() != null
                && Duration.between(user.getVerificationSentAt(), Instant.now())
                        .getSeconds() < RESEND_COOLDOWN_SECONDS) {
            throw new IllegalArgumentException(
                    "Please wait a minute before requesting another code.");
        }
        issueAndSendCode(user);
    }

    public AuthResponse loginUser(LoginRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.getEmail().trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        if (!user.isVerified()) {
            throw new IllegalArgumentException("Please verify your email first");
        }

        String token = jwtService.generateToken(user.getEmail());
        AuthResponse response = new AuthResponse("Login successful", user.getId(),
                user.getFullName(), user.getEmail(), token);
        response.setOnboardingStatus(user.getOnboardingStatus());
        return response;
    }

    private void issueAndSendCode(User user) {
        String code = String.format("%06d", random.nextInt(1_000_000));

        user.setVerificationCodeHash(passwordEncoder.encode(code));
        user.setVerificationExpiresAt(Instant.now().plus(Duration.ofMinutes(CODE_EXPIRY_MINUTES)));
        user.setVerificationSentAt(Instant.now());
        user.setVerificationAttempts(0);
        userRepository.save(user);

        try {
            emailService.sendVerificationCode(user.getEmail(), user.getFullName(), code);
        } catch (MailException e) {
            log.error("Failed to send verification email", e);
            throw new IllegalArgumentException(
                    "Could not send the verification email. Check the address and try again.");
        }
    }
}