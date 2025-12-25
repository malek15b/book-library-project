package org.example.backend.model;

import lombok.With;

import java.time.Instant;

@With
public record BookDto(String name,
                      String author,
                      String genreId,
                      String borrowedBy,
                      Instant borrowedAt) {
    public Book toBook(String id) {
        return new Book(id, name, author, genreId, borrowedBy, borrowedAt, Instant.now());
    }

    public Book toBook(String id, Instant createdAt) {
        if (borrowedBy != null && borrowedAt == null) {
            return new Book(id, name, author, genreId, borrowedBy, Instant.now(), createdAt);
        }
        return new Book(id, name, author, genreId, borrowedBy, borrowedAt, createdAt);
    }
}
