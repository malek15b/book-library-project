package org.example.backend.service;

import org.example.backend.exception.IdNotFoundException;
import org.example.backend.model.Book;
import org.example.backend.model.BookDto;
import org.example.backend.openLibrary.OpenLibraryService;
import org.example.backend.repository.BookRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verify;

class BookServiceTest {

    IdService idService = mock(IdService.class);
    BookRepository bookRepository = mock(BookRepository.class);
    BookService service = new BookService(bookRepository, idService, null);
    OpenLibraryService openLibraryService = mock(OpenLibraryService.class);

    @Test
    public void adBook_ShouldReturnBookWithId() {
        //GIVEN
        BookDto bookDto = new BookDto("Test", "Test", null,null, null);
        String id = UUID.randomUUID().toString();
        when(idService.randomId()).thenReturn(id);
        //WHEN
        Book book = service.add(bookDto);
        //THEN
        assertEquals(id, book.id());
    }

    @Test
    public void deleteBook_ShouldBeSuccessful() {
        //GIVEN
        String id = UUID.randomUUID().toString();
        when(bookRepository.existsById(id)).thenReturn(true);
        //WHEN
        service.deleteById(id);
        //THEN
        verify(bookRepository).deleteById(id);
    }

    @Test
    public void deleteBook_ShouldBeFailed_WhenBookIsNotFound() {
        //GIVEN
        String id = UUID.randomUUID().toString();
        when(bookRepository.existsById(id)).thenReturn(false);
        //THEN
        assertThrows(IdNotFoundException.class, () -> service.deleteById(id));
    }

    @Test
    public void updateBook_ShouldBeSuccessful() {
        //GIVEN
        String id = UUID.randomUUID().toString();
        Book book = new Book(id, "Test", "Test", null, null, null, LocalDateTime.now());
        BookDto bookDto = new BookDto("Test updated", "Test updated", null,null, null);
        when(bookRepository.findById(id)).thenReturn(Optional.of(book));
        //WHEN
        service.update(id, bookDto);
        Book updated = bookDto.toBook(id, book.createdAt());
        //THEN
        verify(bookRepository).save(updated);
    }

    @Test
    public void updateBook_ShouldBeFailed_WhenBookIsNotFound() {
        //GIVEN
        String id = UUID.randomUUID().toString();
        BookDto bookDto = new BookDto("Test updated", "Test updated", null,null, null);
        when(bookRepository.findById(id)).thenReturn(Optional.empty());
        //WHEN
        assertThrows(IdNotFoundException.class, () -> service.update(id, bookDto));
    }
}