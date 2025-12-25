package org.example.backend.model;

import java.time.Instant;

public record GenreDto(String name, String color) {

    public Genre toGenre(String id) {
        return new Genre(id, name, color, Instant.now());
    }

    public Genre toGenre(String id, Instant createdAt) {
        return new Genre(id, name, color, createdAt);
    }
}
