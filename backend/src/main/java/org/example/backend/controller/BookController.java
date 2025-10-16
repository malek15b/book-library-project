package org.example.backend.controller;

import lombok.AllArgsConstructor;
import org.example.backend.model.Book;
import org.example.backend.model.BookDto;
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
        return bookService.save(bookDto);
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable String id, @RequestBody BookDto bookDto) {
        return bookService.update(id, bookDto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        return bookService.delete(id) ? id : null;
    }

    @GetMapping("/{id}")
    public Book get(@PathVariable String id) {
        return bookService.getById(id);
    }
}
