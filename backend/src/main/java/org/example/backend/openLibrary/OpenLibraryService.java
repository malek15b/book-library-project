package org.example.backend.openLibrary;

import org.example.backend.model.BookDto;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class OpenLibraryService {

    private static final String BASE_URL = "https://openlibrary.org";
    private static final String BOOK_URL = "/api/books?bibkeys=ISBN:%s&jscmd=details&format=json";
    private final RestClient restClient;

    public OpenLibraryService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl(BASE_URL)
                .build();
    }

    public BookDto findByISBN(String isbn) {
        String uri = String.format(BOOK_URL, isbn);

        Map<String, OpenLibraryResponse> response = this.restClient.get()
                .uri(uri)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });

        if (response == null || response.isEmpty()) return null;
        OpenLibraryResponse data = response.get("ISBN:" + isbn);

        if (data == null || data.details() == null) return null;
        Details details = data.details();
        Work work = details.works().getFirst();

        List<String> authors = this.fetchAuthorsFromWork(work.key());
        if (authors.isEmpty()) return null;

        return new BookDto(
                details.title(),
                authors.getFirst(),
                null
        );

    }

    private List<String> fetchAuthorsFromWork(String workKey) {
        String workUrl = BASE_URL + workKey + ".json";
        WorkResponse work = restClient.get()
                .uri(workUrl)
                .retrieve()
                .body(WorkResponse.class);

        if (work == null || work.authors() == null) return List.of();

        List<String> authorNames = new ArrayList<>();
        for (WorkResponse.WorkAuthor wa : work.authors()) {
            String authorKey = wa.author().key();
            String authorUrl = BASE_URL + authorKey + ".json";
            AuthorResponse author = restClient.get()
                    .uri(authorUrl)
                    .retrieve()
                    .body(AuthorResponse.class);

            if (author != null && author.name() != null) {
                authorNames.add(author.name());
            }
        }
        return authorNames;
    }
}
