package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.exception.IdNotFoundException;
import org.example.backend.model.Genre;
import org.example.backend.model.GenreDto;
import org.example.backend.repository.GenreRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;
    private final IdService idService;

    public List<Genre> getAll() {
        return genreRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Genre add(GenreDto genreDto) {
        Genre genre = genreDto.toGenre(idService.randomId());
        genreRepository.save(genre);
        return genre;
    }

    public Genre getById(String id) {
        return genreRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException(id, "Genre"));
    }

    public Genre update(String id, GenreDto genreDto) {
        Genre genre = this.getById(id);
        Genre updated = genreDto.toGenre(id, genre.createdAt());
        return genreRepository.save(updated);
    }

    public void deleteById(String id) {
        if (!genreRepository.existsById(id)) {
            throw new IdNotFoundException(id, "Genre");
        }
        genreRepository.deleteById(id);
    }

}
