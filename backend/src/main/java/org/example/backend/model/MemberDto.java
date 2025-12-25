package org.example.backend.model;

import lombok.With;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

@With
public record MemberDto(String firstname,
                        String lastname,
                        String email,
                        boolean active) {
    public Member toMember(String id) {
        return new Member(id, firstname, lastname, email, active, Instant.now());
    }
    public Member toMember(String id, Instant createdAt) {
        return new Member(id, firstname, lastname, email, active, createdAt);
    }
}
