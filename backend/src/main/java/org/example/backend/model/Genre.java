package org.example.backend.model;

import java.time.LocalDateTime;

public record Genre(String id,
                    String name,
                    String color,
                    LocalDateTime createdAt) {
}
