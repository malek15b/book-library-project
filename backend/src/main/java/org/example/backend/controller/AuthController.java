package org.example.backend.controller;

import org.example.backend.security.AppUser;
import org.example.backend.security.Role;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/me")
    public AppUser getMe(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) {
            return null;
        }
        return new AppUser(
                user.getName(),
                user.getAttributes().get("login").toString(),
                Role.ADMIN
        );
    }
}
