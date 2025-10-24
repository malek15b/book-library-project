package org.example.backend.controller;

import lombok.AllArgsConstructor;
import org.example.backend.security.AppUser;
import org.example.backend.security.AppUserRepository;
import org.example.backend.security.Role;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AppUserRepository appUserRepository;

    @GetMapping("/me")
    public AppUser getMe(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) {
            return null;
        }
        return appUserRepository.findByUserId(user.getName()).orElse(
                new AppUser(
                        user.getName(),
                        user.getName(),
                        user.getAttributes().get("login").toString() + "_guest",
                        Role.USER
                )
        );
    }
}
