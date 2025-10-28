package org.example.backend.openLibrary;

import java.util.List;

public record BookResponse(
        String name,
        String author,
        List<String> subjects
) {
}
