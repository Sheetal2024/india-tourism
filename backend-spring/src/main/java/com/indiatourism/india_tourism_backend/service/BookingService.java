package com.indiatourism.india_tourism_backend.service;

import com.indiatourism.india_tourism_backend.entity.Booking;
import com.indiatourism.india_tourism_backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EmailService emailService;

    public Booking createBooking(Booking booking) {
        try {
            Booking savedBooking = bookingRepository.save(booking);
            System.out.println("✅ Booking saved with ID: " + savedBooking.getId());
        
        
        
        // Send confirmation email
        try{
        emailService.sendBookingConfirmation(
            savedBooking.getEmail(),
            savedBooking.getName(),
            savedBooking.getDestinationName(),
            savedBooking.getPackageName(),
            savedBooking.getTravelDate().toString()
        );
        System.out.println("✅ Email sent to: " + savedBooking.getEmail());
            } catch (Exception e) {
                System.err.println("❌ Email failed but booking saved: " + e.getMessage());
                // Don't throw exception - just log it
            }
        
        return savedBooking;

        } catch (Exception e) {
            System.err.println("❌ Error saving booking: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }

    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public void updateBookingStatus(Long id, String status) {
        bookingRepository.updateStatus(id, status);
    }

    public int getTotalBookings() {
        return bookingRepository.count();
    }
}