package org.example.backend.model;

import java.time.Instant;

public record Member(String id,
                     String firstname,
                     String lastname,
                     String email,
                     boolean active,
                     Instant createdAt) {
}
