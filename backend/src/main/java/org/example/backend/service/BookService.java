package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.exception.IdNotFoundException;
import org.example.backend.model.Book;
import org.example.backend.model.BookDto;
import org.example.backend.repository.BookRepository;
import org.example.backend.repository.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final GenreRepository genreRepository;
    private final IdService idService;

    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    public Book add(BookDto bookDto) {
        Book book = bookDto.toBook(idService.randomId());
        bookRepository.save(book);
        return book;
    }

    public Book getById(String id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException(id, "Book"));
    }

    public Book update(String id, BookDto bookDto) {
        Book book = this.getById(id);
        Book updated = bookDto.toBook(id, book.createdAt());
        return bookRepository.save(updated);
    }

    public void deleteById(String id) {
        if (!bookRepository.existsById(id)) {
            throw new IdNotFoundException(id, "Book");
        }
        bookRepository.deleteById(id);
    }

}
