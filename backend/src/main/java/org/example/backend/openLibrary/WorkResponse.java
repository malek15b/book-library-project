package org.example.backend.openLibrary;

import java.util.List;

public record WorkResponse(
        List<WorkAuthor> authors,
        List<String> subjects
) {
    public record WorkAuthor(WorkAuthorRef author) {}
    public record WorkAuthorRef(String key) {}
}
