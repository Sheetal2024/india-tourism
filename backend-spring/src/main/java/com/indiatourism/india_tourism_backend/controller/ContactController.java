package com.indiatourism.india_tourism_backend.controller;

import com.indiatourism.india_tourism_backend.entity.ContactMessage;
import com.indiatourism.india_tourism_backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<BookingController.ApiResponse> submitContactForm(@RequestBody ContactMessage contactMessage) {
        try {
            // Validate required fields
            if (contactMessage.getName() == null || contactMessage.getEmail() == null || 
                contactMessage.getSubject() == null || contactMessage.getMessage() == null) {
                return ResponseEntity.badRequest().body(
                    new BookingController.ApiResponse(false, "All fields are required")
                );
            }

            ContactMessage savedMessage = contactService.saveMessage(contactMessage);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                new BookingController.ApiResponse(true, "Message sent successfully! We will get back to you soon.", savedMessage)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new BookingController.ApiResponse(false, "Failed to send message: " + e.getMessage())
            );
        }
    }

    @GetMapping
    public ResponseEntity<BookingController.ApiResponse> getAllMessages() {
        try {
            List<ContactMessage> messages = contactService.getAllMessages();
            return ResponseEntity.ok(new BookingController.ApiResponse(true, "Messages retrieved successfully", messages));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new BookingController.ApiResponse(false, "Failed to retrieve messages")
            );
        }
    }
}