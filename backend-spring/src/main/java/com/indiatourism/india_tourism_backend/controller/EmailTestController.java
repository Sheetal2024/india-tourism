package com.indiatourism.india_tourism_backend.controller;

import com.indiatourism.india_tourism_backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class EmailTestController {
    @Autowired
    private EmailService emailService;

    @GetMapping("/send-test-email")
    public String sendTestEmail(@RequestParam String email) {
        try {
            emailService.sendBookingConfirmation(
                email,
                "Test User",
                "Taj Mahal",
                "Premium Package",
                "2024-12-25"
            );
            return "✅ Test email sent to: " + email;
        } catch (Exception e) {
            return "❌ Failed: " + e.getMessage();
        }
    }
}
