package org.example.backend.controller;

import lombok.AllArgsConstructor;
import org.example.backend.model.Book;
import org.example.backend.model.BookDto;
import org.example.backend.openLibrary.OpenLibraryResponse;
import org.example.backend.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@AllArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<Book> getAll() {
        return bookService.getAll();
    }

    @PostMapping
    public Book save(@RequestBody BookDto bookDto) {
        return bookService.add(bookDto);
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable String id, @RequestBody BookDto bookDto) {
        return bookService.update(id, bookDto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        bookService.deleteById(id);
        return "Book with id " + id + " was deleted";
    }

    @GetMapping("/{id}")
    public Book get(@PathVariable String id) {
        return bookService.getById(id);
    }

    @GetMapping("/search")
    public BookDto findByISBN(@RequestParam String isbn) {
        return bookService.search(isbn);
    }
}
