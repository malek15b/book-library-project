package org.example.backend.exception;

import java.util.NoSuchElementException;

public class IdNotFoundException extends NoSuchElementException {
    private static final String MESSAGE = "%s with id %s not found";

    public IdNotFoundException(String id, String model) {
        super(String.format(MESSAGE, model, id));
    }
}
