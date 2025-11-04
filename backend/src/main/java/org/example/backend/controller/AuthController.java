package org.example.backend.controller;

import lombok.AllArgsConstructor;
import org.example.backend.jwt.JwtService;
import org.example.backend.security.AppUser;
import org.example.backend.security.AppUserDto;
import org.example.backend.security.AppUserRepository;
import org.example.backend.security.Role;
import org.example.backend.service.IdService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AppUserRepository appUserRepository;
    private final IdService idService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @GetMapping("/me")
    public AppUser getMe(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        Object principal = authentication.getPrincipal();
        String username = null;

        if (principal instanceof OAuth2User oauthUser) {
            username = oauthUser.getName();
        } else if (principal instanceof UserDetails userDetails) {
            username = userDetails.getUsername();
        } else if (principal instanceof String s) {
            username = s;
        }
        if (username == null) {
            return null;
        }
        return appUserRepository.findByUserId(username).orElse(null);
    }

    @PostMapping("/register")
    public AppUserDto register(@RequestBody AppUser user) {
        Optional<AppUser> optional = appUserRepository.findByUsername(user.username());
        if (optional.isPresent() && optional.get().password() != null) {
            return null;
        }
        AppUser newUser = AppUser.builder()
                .id(idService.randomId())
                .userId(user.username())
                .username(user.username())
                .password(passwordEncoder.encode(user.password()))
                .role(Role.USER)
                .build();
        appUserRepository.save(newUser);
        return new AppUserDto(user.id(), user.username(), user.role());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AppUser loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtService.generateToken(userDetails);

            AppUser user = appUserRepository.findByUsername(loginRequest.username()).orElseThrow();
            AppUserDto response = new AppUserDto(user.id(), user.username(), user.role());

            return ResponseEntity.ok(Map.of(
                    "user", response,
                    "token", token
            ));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

}
