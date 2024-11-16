package com.example.fintrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.fintrack.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    void deleteUserByUsername(String username);
}