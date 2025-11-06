package org.example.backend.controller;

import org.example.backend.model.Member;
import org.example.backend.repository.MemberRepository;
import org.example.backend.security.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;

@SpringBootTest
@AutoConfigureMockMvc
class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void getAllWithoutUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/members"))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void getAllWithUser() throws Exception {
        Member member1 = new Member(
                "1", "Test", "Test", "test@example.com", true, LocalDateTime.now());
        Member member2 = new Member(
                "2", "Test", "Test", "test@example.com", false, LocalDateTime.now());
        memberRepository.save(member1);
        memberRepository.save(member2);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/members")
                .with(oidcLogin()
                        .userInfoToken(token -> token.claim("login", "testUser"))
                        .authorities(new SimpleGrantedAuthority(Role.ADMIN.name()))
                ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(2));

    }

    @Test
    @WithMockUser
    void getAllByActiveTrue_ShouldReturnEmptyList() throws Exception {
        Member member = new Member(
                "1", "Test", "Test", "test@example.com", false, LocalDateTime.now());
        memberRepository.save(member);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/members?active=true")
                .with(oidcLogin()
                        .userInfoToken(token -> token.claim("login", "testUser"))
                        .authorities(new SimpleGrantedAuthority(Role.ADMIN.name()))
                ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0));
    }

    @Test
    @WithMockUser
    void getAllByActiveTrue_ShouldReturnMemberWithActiveFalse() throws Exception {
        Member member1 = new Member(
                "1", "Test", "Test", "test@example.com", true, LocalDateTime.now());
        Member member2 = new Member(
                "2", "Test", "Test", "test@example.com", false, LocalDateTime.now());
        Member member3 = new Member(
                "3", "Test", "Test", "test@example.com", false, LocalDateTime.now());
        memberRepository.save(member1);
        memberRepository.save(member2);
        memberRepository.save(member3);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/members?active=false")
                .with(oidcLogin()
                        .userInfoToken(token -> token.claim("login", "testUser"))
                        .authorities(new SimpleGrantedAuthority(Role.ADMIN.name()))
                ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(2));

    }
}