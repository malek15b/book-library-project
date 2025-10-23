package org.example.backend.controller;

import lombok.AllArgsConstructor;
import org.example.backend.model.Genre;
import org.example.backend.model.GenreDto;
import org.example.backend.service.GenreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
@AllArgsConstructor
public class GenreController {

    private final GenreService genreService;

    @GetMapping
    public List<Genre> getAll() {
        return genreService.getAll();
    }

    @PostMapping
    public Genre save(@RequestBody GenreDto GenreDto) {
        return genreService.add(GenreDto);
    }

    @PutMapping("/{id}")
    public Genre update(@PathVariable String id, @RequestBody GenreDto GenreDto) {
        return genreService.update(id, GenreDto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        genreService.deleteById(id);
        return "Genre with id " + id + " was deleted";
    }

    @GetMapping("/{id}")
    public Genre get(@PathVariable String id) {
        return genreService.getById(id);
    }
}
