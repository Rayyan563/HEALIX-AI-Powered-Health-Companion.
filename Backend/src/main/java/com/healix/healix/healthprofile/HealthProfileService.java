
package com.healix.healix.healthprofile;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class HealthProfileService {

    private final HealthProfileRepository healthProfileRepository;

    public HealthProfileService(
            HealthProfileRepository healthProfileRepository) {
        this.healthProfileRepository = healthProfileRepository;
    }

    public HealthProfile saveOrUpdate(
            String userId, HealthProfile profile) {

        LocalDateTime now = LocalDateTime.now();

        HealthProfile existingProfile =
                healthProfileRepository.findByUserId(userId)
                        .orElse(null);

        if (existingProfile != null) {
            profile.setId(existingProfile.getId());
            profile.setCreatedAt(existingProfile.getCreatedAt());
        } else {
            profile.setCreatedAt(now);
        }

        profile.setUserId(userId);
        profile.setUpdatedAt(now);
        profile.setSetupCompleted(true);

        return healthProfileRepository.save(profile);
    }

    public HealthProfile getByUserId(String userId) {
        return healthProfileRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Health profile not found"));
    }
}
