package com.healix.healix.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class OnboardingStatusRequest {

    @NotBlank(message = "status is required")
    @Pattern(regexp = "SKIPPED|COMPLETED",
             message = "status must be SKIPPED or COMPLETED")
    private String status;

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}