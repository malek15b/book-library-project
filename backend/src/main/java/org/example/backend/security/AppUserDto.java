package org.example.backend.security;

import lombok.Builder;

@Builder
public record AppUserDto(String id, String username, Role role) {
}
