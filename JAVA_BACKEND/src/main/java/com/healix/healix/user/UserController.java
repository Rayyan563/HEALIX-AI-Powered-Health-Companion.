package com.healix.healix.user;

import com.healix.healix.dto.OnboardingStatusRequest;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public Map<String, String> me(Authentication authentication) {
        User user = findUser(authentication);
        return Map.of(
                "userId", user.getId(),
                "fullName", user.getFullName(),
                "email", user.getEmail(),
                "onboardingStatus", user.getOnboardingStatus()
        );
    }

    @PutMapping("/me/onboarding")
    public Map<String, String> updateOnboarding(
            Authentication authentication,
            @Valid @RequestBody OnboardingStatusRequest request) {

        User user = findUser(authentication);

        // A completed setup must never be downgraded by a later "skip".
        if (!"COMPLETED".equals(user.getOnboardingStatus())) {
            user.setOnboardingStatus(request.getStatus());
            userRepository.save(user);
        }
        return Map.of("onboardingStatus", user.getOnboardingStatus());
    }

    private User findUser(Authentication authentication) {
        return userRepository.findByEmailIgnoreCase(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}