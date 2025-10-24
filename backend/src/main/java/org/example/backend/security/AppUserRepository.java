package org.example.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends MongoRepository<AppUser, String> {

    public Optional<AppUser> findByUserId(String userId);
}
