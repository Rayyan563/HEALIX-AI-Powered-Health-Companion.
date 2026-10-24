
package com.healix.healix.healthprofile;

import com.healix.healix.security.JwtService;
import com.healix.healix.user.User;
import com.healix.healix.user.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/profile")
public class HealthProfileController {

    private final HealthProfileService healthProfileService;
    private final UserRepository userRepository;

    public HealthProfileController(
            HealthProfileService healthProfileService,
            UserRepository userRepository) {

        this.healthProfileService = healthProfileService;
        this.userRepository = userRepository;
    }

    @PutMapping
    public ResponseEntity<?> saveOrUpdate(
            Authentication authentication,
            @RequestBody HealthProfile profile) {

        if (authentication == null
                || !authentication.isAuthenticated()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Authentication required"));
        }

        String email = authentication.getName();

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElse(null);

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "User not found"));
        }

        HealthProfile saved =
                healthProfileService.saveOrUpdate(
                        user.getId(), profile);

        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<?> getProfile(
            Authentication authentication) {

        if (authentication == null
                || !authentication.isAuthenticated()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Authentication required"));
        }

        String email = authentication.getName();

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElse(null);

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "User not found"));
        }

        try {
            HealthProfile profile =
                    healthProfileService.getByUserId(user.getId());

            return ResponseEntity.ok(profile);

        } catch (RuntimeException ex) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "message", "Health profile not found"));
        }
    }
}
