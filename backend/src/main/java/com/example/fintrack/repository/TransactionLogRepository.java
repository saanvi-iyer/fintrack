package com.example.fintrack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.fintrack.domain.TransactionLog;

public interface TransactionLogRepository extends JpaRepository<TransactionLog, Long> {
    List<TransactionLog> findByEmail(String email);
    
    @Query("SELECT MAX(t.userTransactionId) FROM TransactionLog t WHERE t.email = :email")
    Integer findMaxUserTransactionIdByEmail(@Param("email") String email);
}
