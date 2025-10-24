package org.example.backend.controller;

import org.example.backend.model.Book;
import org.example.backend.repository.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;

@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @Test
    @WithMockUser
    void getAllWithUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("login", "testUser")
                        ))
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getAllWithoutUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books"))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void getBookWithUser() throws Exception {
        String id = "1";
        Book book = new Book(id, "Test", "Test", "1", LocalDateTime.now());
        bookRepository.save(book);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/" + id)
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("login", "testUser")
                        ))
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getBookWithoutUser() throws Exception {
        String id = "1";
        Book book = new Book(id, "Test", "Test", "1", LocalDateTime.now());
        bookRepository.save(book);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/" + id))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

}