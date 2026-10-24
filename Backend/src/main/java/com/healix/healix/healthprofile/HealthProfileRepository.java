
package com.healix.healix.healthprofile;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface HealthProfileRepository
        extends MongoRepository<HealthProfile, String> {

    Optional<HealthProfile> findByUserId(String userId);

    boolean existsByUserId(String userId);
}
