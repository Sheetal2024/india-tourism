package com.indiatourism.india_tourism_backend.repository;

import com.indiatourism.india_tourism_backend.entity.ContactMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class ContactRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public ContactMessage save(ContactMessage contactMessage) {
        String sql = "INSERT INTO contact_messages (name, email, subject, message, status) " +
                    "VALUES (?, ?, ?, ?, ?)";
        
        KeyHolder keyHolder = new GeneratedKeyHolder();
        
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, contactMessage.getName());
            ps.setString(2, contactMessage.getEmail());
            ps.setString(3, contactMessage.getSubject());
            ps.setString(4, contactMessage.getMessage());
            ps.setString(5, contactMessage.getStatus());
            return ps;
        }, keyHolder);
        
        if (keyHolder.getKey() != null) {
            contactMessage.setId(keyHolder.getKey().longValue());
        }
        return contactMessage;
    }

    public List<ContactMessage> findAll() {
        String sql = "SELECT * FROM contact_messages ORDER BY submission_date DESC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ContactMessage.class));
    }

    public Optional<ContactMessage> findById(Long id) {
        String sql = "SELECT * FROM contact_messages WHERE id = ?";
        try {
            ContactMessage message = jdbcTemplate.queryForObject(sql, 
                new BeanPropertyRowMapper<>(ContactMessage.class), id);
            return Optional.ofNullable(message);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public void updateStatus(Long id, String status) {
        String sql = "UPDATE contact_messages SET status = ? WHERE id = ?";
        jdbcTemplate.update(sql, status, id);
    }
}