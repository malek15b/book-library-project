package org.example.backend.repository;

import org.example.backend.model.Genre;
import org.example.backend.model.Member;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends MongoRepository<Member, String> {
    List<Member> findAllByActive(boolean active,  Sort sort);
}
