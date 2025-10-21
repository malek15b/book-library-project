package org.example.backend.model;

import lombok.With;

import java.time.LocalDateTime;

@With
public record BookDto(String name,
                      String author,
                      Genre genre) {
    public Book toBook(String id) {
        return new Book(id, name, author, genre, LocalDateTime.now());
    }

    public Book toBook(String id, LocalDateTime createdAt) {
        return new Book(id, name, author, genre, createdAt);
    }
}
