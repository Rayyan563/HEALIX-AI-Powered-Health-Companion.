package com.healix.healix.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String fullName;

    @Indexed(unique = true)
    private String email;

    @Indexed(unique = true, sparse = true)
    private String phone;

    private String password;

    private boolean verified;
    private String verificationCodeHash;
    private Instant verificationExpiresAt;
    private Instant verificationSentAt;
    private int verificationAttempts;

        // Forgot password fields
    private String resetCodeHash;
    private Instant resetCodeExpiresAt;
    private Instant resetCodeSentAt;
    private int resetCodeAttempts;
    private boolean resetCodeVerified;
    public User() {
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }

    public String getVerificationCodeHash() { return verificationCodeHash; }
    public void setVerificationCodeHash(String h) { this.verificationCodeHash = h; }

    public Instant getVerificationExpiresAt() { return verificationExpiresAt; }
    public void setVerificationExpiresAt(Instant t) { this.verificationExpiresAt = t; }

    public Instant getVerificationSentAt() { return verificationSentAt; }
    public void setVerificationSentAt(Instant t) { this.verificationSentAt = t; }

    public int getVerificationAttempts() { return verificationAttempts; }
    public void setVerificationAttempts(int a) { this.verificationAttempts = a; }

    private String onboardingStatus = "PENDING";

    public String getOnboardingStatus() {
        return onboardingStatus == null ? "PENDING" : onboardingStatus;
    }
    public void setOnboardingStatus(String onboardingStatus) {
        this.onboardingStatus = onboardingStatus;
    }

    public String getResetCodeHash() {
    return resetCodeHash;
}

public void setResetCodeHash(String resetCodeHash) {
    this.resetCodeHash = resetCodeHash;
}

public Instant getResetCodeExpiresAt() {
    return resetCodeExpiresAt;
}

public void setResetCodeExpiresAt(Instant resetCodeExpiresAt) {
    this.resetCodeExpiresAt = resetCodeExpiresAt;
}

public Instant getResetCodeSentAt() {
    return resetCodeSentAt;
}

public void setResetCodeSentAt(Instant resetCodeSentAt) {
    this.resetCodeSentAt = resetCodeSentAt;
}

public int getResetCodeAttempts() {
    return resetCodeAttempts;
}

public void setResetCodeAttempts(int resetCodeAttempts) {
    this.resetCodeAttempts = resetCodeAttempts;
}
public boolean isResetCodeVerified() {
    return resetCodeVerified;
}

public void setResetCodeVerified(boolean resetCodeVerified) {
    this.resetCodeVerified = resetCodeVerified;
}
}