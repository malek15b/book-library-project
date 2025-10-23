package org.example.backend.repository;

import org.example.backend.model.Book;
import org.example.backend.model.Genre;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends MongoRepository<Genre,String> {
}
