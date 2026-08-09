package com.indiatourism.india_tourism_backend.controller;

import com.indiatourism.india_tourism_backend.service.NewsletterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsletterController {

    @Autowired
    private NewsletterService newsletterService;

    @PostMapping("/subscribe")
    public ResponseEntity<BookingController.ApiResponse> subscribe(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new BookingController.ApiResponse(false, "Email is required")
                );
            }

            // Basic email validation
            if (!isValidEmail(email)) {
                return ResponseEntity.badRequest().body(
                    new BookingController.ApiResponse(false, "Please enter a valid email address")
                );
            }

            newsletterService.subscribe(email);
            return ResponseEntity.ok(
                new BookingController.ApiResponse(true, "Thank you for subscribing to our newsletter!")
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new BookingController.ApiResponse(false, "Failed to subscribe to newsletter")
            );
        }
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<BookingController.ApiResponse> unsubscribe(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new BookingController.ApiResponse(false, "Email is required")
                );
            }

            newsletterService.unsubscribe(email);
            return ResponseEntity.ok(
                new BookingController.ApiResponse(true, "You have been unsubscribed from our newsletter")
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new BookingController.ApiResponse(false, "Failed to unsubscribe")
            );
        }
    }

    @GetMapping("/subscribers")
    public ResponseEntity<BookingController.ApiResponse> getSubscribers() {
        try {
            return ResponseEntity.ok(new BookingController.ApiResponse(
                true, 
                "Subscribers retrieved successfully", 
                newsletterService.getActiveSubscribers()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new BookingController.ApiResponse(false, "Failed to retrieve subscribers")
            );
        }
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        return email != null && email.matches(emailRegex);
    }
}