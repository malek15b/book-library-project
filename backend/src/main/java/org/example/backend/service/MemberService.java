package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.exception.IdNotFoundException;
import org.example.backend.model.Book;
import org.example.backend.model.Member;
import org.example.backend.model.MemberDto;
import org.example.backend.repository.BookRepository;
import org.example.backend.repository.MemberRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;
    private final IdService idService;

    public List<Member> getAll() {
        return memberRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public List<Member> getAllActive(boolean active) {
        return memberRepository.findAllByActive(active, Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Member add(MemberDto memberDto) {
        Member member = memberDto.toMember(idService.randomId());
        memberRepository.save(member);
        return member;
    }

    public Member getById(String id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException(id, "Member"));
    }

    public Member update(String id, MemberDto memberDto) {
        Member member = this.getById(id);
        Member updated = memberDto.toMember(id, member.createdAt());
        return memberRepository.save(updated);
    }

    public void deleteById(String id) {
        if (!memberRepository.existsById(id)) {
            throw new IdNotFoundException(id, "Member");
        }
        memberRepository.deleteById(id);
    }

    public List<Book> getBooksByMemberId(String id) {
        if (!memberRepository.existsById(id)) {
            throw new IdNotFoundException(id, "Member");
        }
        return bookRepository.findByBorrowedByIs(id, Sort.by(Sort.Direction.DESC, "borrowedAt"));
    }
}
