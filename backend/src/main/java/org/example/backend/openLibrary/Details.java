package org.example.backend.openLibrary;

import java.util.List;

public record Details(
        String title,
        List<Work> works
) {}
