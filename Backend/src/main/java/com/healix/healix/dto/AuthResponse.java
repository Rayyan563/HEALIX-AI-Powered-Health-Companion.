package com.healix.healix.dto;

public class AuthResponse {

    private String message;
    private String userId;
    private String fullName;
    private String email;
    private String token;
    private String onboardingStatus;

    public AuthResponse() {
    }

    public AuthResponse(String message, String userId,
                        String fullName, String email) {
        this.message = message;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
    }

    public AuthResponse(String message, String userId,
                        String fullName, String email, String token) {
        this(message, userId, fullName, email);
        this.token = token;
    }

    public String getMessage() { return message; }
    public String getUserId() { return userId; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getToken() { return token; }
    public String getOnboardingStatus() { return onboardingStatus; }
    public void setOnboardingStatus(String onboardingStatus) {
        this.onboardingStatus = onboardingStatus;
    }
}