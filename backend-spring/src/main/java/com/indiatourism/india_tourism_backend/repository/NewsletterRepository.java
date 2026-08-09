package com.indiatourism.india_tourism_backend.repository;

import com.indiatourism.india_tourism_backend.entity.NewsletterSubscription;
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
public class NewsletterRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public NewsletterSubscription subscribe(NewsletterSubscription subscription) {
        Optional<NewsletterSubscription> existing = findByEmail(subscription.getEmail());
        
        if (existing.isPresent()) {
            String updateSql = "UPDATE newsletter_subscriptions SET is_active = TRUE WHERE email = ?";
            jdbcTemplate.update(updateSql, subscription.getEmail());
            return existing.get();
        } else {
            String sql = "INSERT INTO newsletter_subscriptions (email, is_active) VALUES (?, ?)";
            
            KeyHolder keyHolder = new GeneratedKeyHolder();
            
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, subscription.getEmail());
                ps.setBoolean(2, true);
                return ps;
            }, keyHolder);
            
            if (keyHolder.getKey() != null) {
                subscription.setId(keyHolder.getKey().longValue());
            }
            return subscription;
        }
    }

    public Optional<NewsletterSubscription> findByEmail(String email) {
        String sql = "SELECT * FROM newsletter_subscriptions WHERE email = ?";
        try {
            NewsletterSubscription subscription = jdbcTemplate.queryForObject(sql, 
                new BeanPropertyRowMapper<>(NewsletterSubscription.class), email);
            return Optional.ofNullable(subscription);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public void unsubscribe(String email) {
        String sql = "UPDATE newsletter_subscriptions SET is_active = FALSE WHERE email = ?";
        jdbcTemplate.update(sql, email);
    }

    public List<NewsletterSubscription> findAllActive() {
        String sql = "SELECT * FROM newsletter_subscriptions WHERE is_active = TRUE ORDER BY subscription_date DESC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(NewsletterSubscription.class));
    }

    public int countActive() {
        String sql = "SELECT COUNT(*) FROM newsletter_subscriptions WHERE is_active = TRUE";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
        return count != null ? count : 0;
    }
}