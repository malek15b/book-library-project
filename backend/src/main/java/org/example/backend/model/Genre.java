package org.example.backend.model;

import java.time.Instant;

public record Genre(String id,
                    String name,
                    String color,
                    Instant createdAt) {
}
