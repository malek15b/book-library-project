package org.example.backend.controller;

import lombok.AllArgsConstructor;
import org.example.backend.model.Book;
import org.example.backend.model.Member;
import org.example.backend.model.MemberDto;
import org.example.backend.service.MemberService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@AllArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public List<Member> getAll(@RequestParam(required = false) Boolean active) {
        if (active != null) {
            return memberService.getAllActive(active);
        }
        return memberService.getAll();
    }

    @PostMapping
    public Member save(@RequestBody MemberDto memberDto) {
        return memberService.add(memberDto);
    }

    @PutMapping("/{id}")
    public Member update(@PathVariable String id, @RequestBody MemberDto memberDto) {
        return memberService.update(id, memberDto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        memberService.deleteById(id);
        return "Member with id " + id + " was deleted";
    }

    @GetMapping("/{id}")
    public Member get(@PathVariable String id) {
        return memberService.getById(id);
    }

    @GetMapping("/books/{id}")
    public List<Book> getBooks(@PathVariable String id) {
        return memberService.getBooksByMemberId(id);
    }
}
