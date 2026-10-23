package com.healix.healix.dto;

public class AuthResponse {

    private String message;
    private String userId;
    private String fullName;
    private String email;

    public AuthResponse() {
    }

    public AuthResponse(String message, String userId,
                        String fullName, String email) {
        this.message = message;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public String getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;

    }

    private String token;

    public AuthResponse(
            String message,
            String userId,
            String fullName,
            String email,
            String token) {

        this.message = message;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.token = token;
    }
    public String getToken() {
        return token;
    }

}
