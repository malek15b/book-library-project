package org.example.backend.security;

import lombok.RequiredArgsConstructor;
import org.example.backend.service.IdService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AppUserRepository appUserRepository;
    private final IdService idService;

    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oauthUser = super.loadUser(userRequest);
        AppUser appUser = appUserRepository.findByUserId(oauthUser.getName())
                .orElseGet(() -> createAndSaveUser(oauthUser));

        return new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(appUser.role().name())),
                oauthUser.getAttributes(), "id");
    }

    private AppUser createAndSaveUser(OAuth2User oauthUser) {
        AppUser newUser = AppUser.builder()
                .id(idService.randomId())
                .userId(oauthUser.getName())
                .username(oauthUser.getAttribute("login"))
                .role(Role.USER)
                .build();

        return appUserRepository.save(newUser);
    }
}
