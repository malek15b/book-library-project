package org.example.backend.service;

import org.example.backend.model.Genre;
import org.example.backend.model.GenreDto;
import org.example.backend.repository.GenreRepository;
import org.junit.jupiter.api.Test;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class GenreServiceTest {

    IdService idService = mock(IdService.class);
    GenreRepository genreRepository = mock(GenreRepository.class);
    GenreService service = new GenreService(genreRepository, idService);

    @Test
    public void adGenre_ShouldReturnGenreWithId() {
        //GIVEN
        GenreDto genreDto = new GenreDto("Chemie", "blue");
        String id = UUID.randomUUID().toString();
        when(idService.randomId()).thenReturn(id);
        //WHEN
        Genre genre = service.add(genreDto);
        //THEN
        assertEquals(id, genre.id());
    }
}