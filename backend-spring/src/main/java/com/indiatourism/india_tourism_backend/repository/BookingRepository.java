package com.indiatourism.india_tourism_backend.repository;

import com.indiatourism.india_tourism_backend.entity.Booking;
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
public class BookingRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Booking save(Booking booking) {
        String sql = "INSERT INTO bookings (name, email, phone, destination_name, package_name, " +
                    "package_price, travel_date, number_of_travelers, special_requests, status) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        KeyHolder keyHolder = new GeneratedKeyHolder();
        
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, booking.getName());
            ps.setString(2, booking.getEmail());
            ps.setString(3, booking.getPhone());
            ps.setString(4, booking.getDestinationName());
            ps.setString(5, booking.getPackageName());
            ps.setBigDecimal(6, booking.getPackagePrice());
            ps.setDate(7, java.sql.Date.valueOf(booking.getTravelDate()));
            ps.setInt(8, booking.getNumberOfTravelers());
            ps.setString(9, booking.getSpecialRequests());
            ps.setString(10, booking.getStatus());
            return ps;
        }, keyHolder);
        
        if (keyHolder.getKey() != null) {
            booking.setId(keyHolder.getKey().longValue());
        }
        return booking;
    }

    public List<Booking> findAll() {
        String sql = "SELECT * FROM bookings ORDER BY booking_date DESC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Booking.class));
    }

    public Optional<Booking> findById(Long id) {
        String sql = "SELECT * FROM bookings WHERE id = ?";
        try {
            Booking booking = jdbcTemplate.queryForObject(sql, 
                new BeanPropertyRowMapper<>(Booking.class), id);
            return Optional.ofNullable(booking);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public void updateStatus(Long id, String status) {
        String sql = "UPDATE bookings SET status = ? WHERE id = ?";
        jdbcTemplate.update(sql, status, id);
    }

    public int count() {
        String sql = "SELECT COUNT(*) FROM bookings";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
        return count != null ? count : 0;
    }
}