package com.indiatourism.india_tourism_backend.controller;

import com.indiatourism.india_tourism_backend.entity.Booking;
import com.indiatourism.india_tourism_backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            System.out.println("📥 Received booking request: " + booking);
            System.out.println("📥 Name: " + booking.getName());
            System.out.println("📥 Email: " + booking.getEmail());
            System.out.println("📥 Destination: " + booking.getDestinationName());
            
            // Validate required fields
            if (booking.getName() == null || booking.getName().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Name is required")
                );
            }
            if (booking.getEmail() == null || booking.getEmail().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Email is required")
                );
            }
            if (booking.getPhone() == null || booking.getPhone().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Phone is required")
                );
            }
            if (booking.getDestinationName() == null || booking.getDestinationName().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Destination is required")
                );
            }

            Booking savedBooking = bookingService.createBooking(booking);
            System.out.println("✅ Booking saved with ID: " + savedBooking.getId());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiResponse(true, "Booking created successfully!", savedBooking)
            );
            
        } catch (Exception e) {
            System.err.println("❌ Error creating booking: " + e.getMessage());
            e.printStackTrace(); // This will print the full stack trace
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse(false, "Failed to create booking: " + e.getMessage())
            );
        }
    }


    @GetMapping
    public ResponseEntity<?> getAllBookings() {
        try {
            List<Booking> bookings = bookingService.getAllBookings();
            return ResponseEntity.ok(new ApiResponse(true, "Bookings retrieved successfully", bookings));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse(false, "Failed to retrieve bookings")
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Long id) {
        try {
            Optional<Booking> booking = bookingService.getBookingById(id);
            if (booking.isPresent()) {
                return ResponseEntity.ok(new ApiResponse(true, "Booking found", booking.get()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ApiResponse(false, "Booking not found")
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse(false, "Failed to retrieve booking")
            );
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            bookingService.updateBookingStatus(id, status);
            return ResponseEntity.ok(new ApiResponse(true, "Booking status updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse(false, "Failed to update booking status")
            );
        }
    }

    // Response wrapper class
    public static class ApiResponse {
        private boolean success;
        private String message;
        private Object data;

        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        public ApiResponse(boolean success, String message, Object data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }

        // Getters and setters
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public Object getData() { return data; }
        public void setData(Object data) { this.data = data; }
    }
}