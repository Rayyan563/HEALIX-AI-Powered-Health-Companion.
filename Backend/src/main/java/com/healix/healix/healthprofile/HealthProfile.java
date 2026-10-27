
package com.healix.healix.healthprofile;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "health_profiles")
public class HealthProfile {

    @Id
    private String id;

    private String userId;

    @NotNull(message = "Age is required")
    @Min(value = 1, message = "Age must be at least 1")
    @Max(value = 120, message = "Age must not exceed 120")
    private Integer age;

    @NotBlank(message = "Gender is required")
    @Size(max = 30, message = "Gender must not exceed 30 characters")
    @Pattern(
            regexp = "Male|Female|Other",
            message = "Gender must be Male, Female, or Other"
    )
    private String gender;

    @NotNull(message = "Height is required")
    @Positive(message = "Height must be positive")
    @DecimalMax(
            value = "300.0",
            message = "Height must not exceed 300 cm"
    )
    private Double heightCm;

    @NotNull(message = "Weight is required")
    @Positive(message = "Weight must be positive")
    @DecimalMax(
            value = "500.0",
            message = "Weight must not exceed 500 kg"
    )
    private Double weightKg;

    @Size(max = 20, message = "Too many existing conditions")
    private List<@NotBlank String> existingConditions;

    @Size(max = 1000, message = "Medications text is too long")
    private String currentMedications;

    @NotBlank(message = "Activity level is required")
    @Pattern(
            regexp = "Sedentary|Lightly Active|Very Active",
            message = "Activity level must be Sedentary, Lightly Active, or Very Active"
    )
    private String activityLevel;

    @NotBlank(message = "Sleep quality is required")
    @Pattern(
            regexp = "Poor Sleep|Fair / Moderate|Excellent Sleep",
            message = "Sleep quality must be Poor Sleep, Fair / Moderate, or Excellent Sleep"
    )
    private String sleepQuality;

    @Size(max = 20, message = "Too many primary concerns")
    private List<@NotBlank String> primaryConcerns;

    @Size(max = 2000, message = "Additional notes are too long")
    private String additionalNotes;

    private boolean setupCompleted;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Double getHeightCm() {
        return heightCm;
    }

    public void setHeightCm(Double heightCm) {
        this.heightCm = heightCm;
    }

    public Double getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(Double weightKg) {
        this.weightKg = weightKg;
    }

    public List<String> getExistingConditions() {
        return existingConditions;
    }

    public void setExistingConditions(List<String> existingConditions) {
        this.existingConditions = existingConditions;
    }

    public String getCurrentMedications() {
        return currentMedications;
    }

    public void setCurrentMedications(String currentMedications) {
        this.currentMedications = currentMedications;
    }

    public String getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(String activityLevel) {
        this.activityLevel = activityLevel;
    }

    public String getSleepQuality() {
        return sleepQuality;
    }

    public void setSleepQuality(String sleepQuality) {
        this.sleepQuality = sleepQuality;
    }

    public List<String> getPrimaryConcerns() {
        return primaryConcerns;
    }

    public void setPrimaryConcerns(List<String> primaryConcerns) {
        this.primaryConcerns = primaryConcerns;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }

    public boolean isSetupCompleted() {
        return setupCompleted;
    }

    public void setSetupCompleted(boolean setupCompleted) {
        this.setupCompleted = setupCompleted;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
