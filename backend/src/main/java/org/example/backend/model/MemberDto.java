package org.example.backend.model;

import lombok.With;

import java.time.LocalDateTime;

@With
public record MemberDto(String firstname,
                        String lastname,
                        String email,
                        boolean active) {
    public Member toMember(String id) {
        return new Member(id, firstname, lastname, email, active, LocalDateTime.now());
    }
    public Member toMember(String id, LocalDateTime createdAt) {
        return new Member(id, firstname, lastname, email, active, createdAt);
    }
}
