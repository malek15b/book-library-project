package org.example.backend.model;

import lombok.With;

import java.time.LocalDateTime;

@With
public record BookDto(String name,
                      String author,
                      String genreId,
                      String borrowedBy) {
    public Book toBook(String id) {
        return new Book(id, name, author, genreId, borrowedBy, LocalDateTime.now());
    }

    public Book toBook(String id, LocalDateTime createdAt) {
        return new Book(id, name, author, genreId, borrowedBy, createdAt);
    }
}
