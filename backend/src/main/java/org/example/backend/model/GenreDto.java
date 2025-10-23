package org.example.backend.model;

import java.time.LocalDateTime;

public record GenreDto(String name, String color) {

    public Genre toGenre(String id) {
        return new Genre(id, name, color, LocalDateTime.now());
    }

    public Genre toGenre(String id, LocalDateTime createdAt) {
        return new Genre(id, name, color, createdAt);
    }
}
