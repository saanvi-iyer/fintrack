package com.example.fintrack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fintrack.domain.TransactionLog;
import com.example.fintrack.repository.TransactionLogRepository;

@RestController
@RequestMapping("/api/transaction-log")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionLogController {

    @Autowired
    private TransactionLogRepository transactionLogRepository;

    @PostMapping("/create")
    public ResponseEntity<TransactionLog> createTransactionLog(@RequestBody TransactionLog transactionLog) {
        Integer maxUserTransactionId = transactionLogRepository.findMaxUserTransactionIdByEmail(transactionLog.getEmail());
        transactionLog.setUserTransactionId(maxUserTransactionId != null ? maxUserTransactionId + 1 : 1);
        TransactionLog savedTransactionLog = transactionLogRepository.save(transactionLog);
        return new ResponseEntity<>(savedTransactionLog, HttpStatus.CREATED);
    }
    

    // Retrieve all transaction logs
    @GetMapping("/")
    public ResponseEntity<Iterable<TransactionLog>> getAllTransactionLogs() {
        Iterable<TransactionLog> transactionLogs = transactionLogRepository.findAll();
        return new ResponseEntity<>(transactionLogs, HttpStatus.OK); // 200 OK
    }

    // Retrieve a transaction log by its ID
    @GetMapping("/{id}")
    public ResponseEntity<TransactionLog> getTransactionLog(@PathVariable Long id) {
        TransactionLog transactionLog = transactionLogRepository.findById(id).orElse(null);
        if (transactionLog == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
        }
        return new ResponseEntity<>(transactionLog, HttpStatus.OK); // 200 OK
    }

    // Retrieve a transaction log by its email
    @GetMapping("/user/{email}")
    public ResponseEntity<List<TransactionLog>> getTransactionLogsByEmail(@PathVariable String email) {
        List<TransactionLog> transactionLogs = transactionLogRepository.findByEmail(email);
        return new ResponseEntity<>(transactionLogs, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransactionLog(@PathVariable Long id) {
        if (!transactionLogRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found if ID doesn't exist
        }
        transactionLogRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content after successful deletion
    }

}
