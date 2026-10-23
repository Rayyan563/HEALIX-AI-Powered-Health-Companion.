package com.healix.healix.auth;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class ProtectedTestController {

    @GetMapping("/api/v1/test/protected")
    public Map<String, String> protectedEndpoint(Authentication authentication) {
        return Map.of(
                "message", "JWT authentication successful",
                "email", authentication.getName()
        );
    }
}