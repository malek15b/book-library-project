package org.example.backend.model;

import java.time.Instant;

public record Book(String id,
                   String name,
                   String author,
                   String genreId,
                   String borrowedBy,
                   Instant borrowedAt,
                   Instant createdAt) {
}
