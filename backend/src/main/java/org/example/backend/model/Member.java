package org.example.backend.model;

import java.time.LocalDateTime;

public record Member(String id,
                     String firstname,
                     String lastname,
                     String email,
                     boolean active,
                     LocalDateTime createdAt) {
}
