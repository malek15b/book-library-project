package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Book;
import org.example.backend.model.BookDto;
import org.example.backend.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final IdService idService;

    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    public Book save(BookDto bookDto) {
        Book book = bookDto.toBook(idService.randomId());
        bookRepository.save(book);
        return book;
    }

    public Book getById(String id) {
        return bookRepository.findById(id).orElse(null);
    }

    public Book update(String id, BookDto bookDto) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            Book updated = bookDto.toBook(id, book.createdAt());
            return bookRepository.save(updated);
        }
        return null;
    }

    public boolean delete(String id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
