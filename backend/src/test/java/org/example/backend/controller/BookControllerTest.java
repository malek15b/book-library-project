package org.example.backend.controller;

import org.example.backend.model.Book;
import org.example.backend.openLibrary.OpenLibraryService;
import org.example.backend.repository.BookRepository;
import org.example.backend.security.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureMockRestServiceServer;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureMockRestServiceServer
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private MockRestServiceServer mockServer;

    @Test
    void search_book_isbn_openLibrary() throws Exception {
        String isbn = "3540412832";
        String bookUrl = String.format(OpenLibraryService.BASE_URL + OpenLibraryService.BOOK_URL, isbn);

        mockServer.expect(requestTo(bookUrl))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess("""
                                   {
                                     "ISBN:3540412832": {
                                       "details": {
                                         "title" : "Einführung in die Kryptographie Test",
                                         "works": [
                                           {
                                             "key": "/works/OL8055353W"
                                           }
                                         ],
                                         "subjects": [
                                            "Kryptologie",
                                            "Computer Science"
                                         ]
                                       }
                                     }
                                   }
                                """,
                        MediaType.APPLICATION_JSON));

        String workUrl = OpenLibraryService.BASE_URL + "/works/OL8055353W" + ".json";
        mockServer.expect(requestTo(workUrl))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess("""
                                   {
                                     "authors": [
                                        {
                                          "author": {"key": "/authors/OL2679922A"}
                                        }
                                     ]
                                   }
                                """,
                        MediaType.APPLICATION_JSON));

        String authorUrl = OpenLibraryService.BASE_URL + "/authors/OL2679922A" + ".json";
        mockServer.expect(requestTo(authorUrl))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess("""
                                   {
                                   "name": "Johannes Buchmann"
                                   }
                                """,
                        MediaType.APPLICATION_JSON));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/search?isbn=" + isbn)
                        .with(oidcLogin()
                                .userInfoToken(token -> token.claim("login", "testUser"))
                                .authorities(new SimpleGrantedAuthority(Role.ADMIN.name()))
                        ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                {
                                name: "Einführung in die Kryptographie Test",
                                author : "Johannes Buchmann",
                                subjects: ["Kryptologie", "Computer Science"]
                                }
                                """
                ));

    }

    @Test
    @WithMockUser
    void getAllWithUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books")
                        .with(oidcLogin()
                                .userInfoToken(token -> token.claim("login", "testUser"))
                                .authorities(new SimpleGrantedAuthority(Role.ADMIN.name()))
                        )
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @WithMockUser
    void getAllWithUser_Role_USER() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books")
                        .with(oidcLogin()
                                .userInfoToken(token -> token.claim("login", "testUser"))
                                .authorities(new SimpleGrantedAuthority(Role.USER.name()))
                        )
                )
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
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
        Book book = new Book(id, "Test", "Test", "1", null, null, LocalDateTime.now());
        bookRepository.save(book);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/" + id)
                        .with(oidcLogin()
                                .userInfoToken(token -> token.claim("login", "testUser"))
                                .authorities(new SimpleGrantedAuthority(Role.ADMIN.name()))
                        )
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getBookWithoutUser() throws Exception {
        String id = "1";
        Book book = new Book(id, "Test", "Test", "1", null, null, LocalDateTime.now());
        bookRepository.save(book);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/" + id))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

}