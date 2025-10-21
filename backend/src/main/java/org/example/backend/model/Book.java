package org.example.backend.model;

import java.time.LocalDateTime;

public record Book(String id,
                   String name,
                   String author,
                   LocalDateTime createdAt) {
}
