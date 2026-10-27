package com.healix.healix.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "name must not be blank")
    private String fullName;

    @NotBlank(message = "email must not be blank")
    @Email(message = "email must be valid")
    @Pattern(
        regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$",
        message = "email must be valid"
    )
    private String email;

    @NotBlank(message = "Password must not be blank")
    @Size(min = 8, message = "password must contains 8 digits")
    private String password;

    public RegisterRequest() {
    }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}