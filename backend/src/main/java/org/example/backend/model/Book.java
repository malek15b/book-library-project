package org.example.backend.model;

import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

public record Book(String id,
                   String name,
                   String author,
                   @CreatedDate LocalDateTime createdAt) {
}
