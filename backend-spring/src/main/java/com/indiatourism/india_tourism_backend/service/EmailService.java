package com.indiatourism.india_tourism_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBookingConfirmation(String toEmail, String name, String destination, 
                                      String packageName, String travelDate) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom("chavansheetal272@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject("🎉 Booking Confirmation - India Tourism");
            
            String htmlContent = buildBookingEmailTemplate(name, destination, packageName, travelDate);
            helper.setText(htmlContent, true);
            
            mailSender.send(message);
            System.out.println("✅ Booking confirmation email sent to: " + toEmail);
        } catch (MessagingException e) {
            System.err.println("❌ Failed to send booking email: " + e.getMessage());
        }
    }

    public void sendContactConfirmation(String toEmail, String name) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom("noreply@indiatourism.com");
            helper.setTo(toEmail);
            helper.setSubject("📧 Message Received - India Tourism");
            
            String htmlContent = buildContactEmailTemplate(name);
            helper.setText(htmlContent, true);
            
            mailSender.send(message);
            System.out.println("✅ Contact confirmation email sent to: " + toEmail);
        } catch (MessagingException e) {
            System.err.println("❌ Failed to send contact email: " + e.getMessage());
        }
    }

    public void sendAdminNotification(String name, String email, String subject, String messageContent) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo("admin@indiatourism.com"); // Change to your admin email
            mailMessage.setSubject("📥 New Contact Form Submission: " + subject);
            mailMessage.setText(
                "New contact form submission:\n\n" +
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Subject: " + subject + "\n" +
                "Message: " + messageContent + "\n\n" +
                "Please respond within 24 hours."
            );
            
            mailSender.send(mailMessage);
            System.out.println("✅ Admin notification sent");
        } catch (Exception e) {
            System.err.println("❌ Failed to send admin notification: " + e.getMessage());
        }
    }

    private String buildBookingEmailTemplate(String name, String destination, String packageName, String travelDate) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { color: #e74c3c; text-align: center; }
                    .content { background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0; }
                    .footer { color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>🎉 Booking Confirmed!</h2>
                </div>
                <p>Dear %s,</p>
                <p>Thank you for booking with India Tourism! Here are your booking details:</p>
                <div class="content">
                    <h3 style="color: #e74c3c; margin-top: 0;">Booking Details</h3>
                    <p><strong>Destination:</strong> %s</p>
                    <p><strong>Package:</strong> %s</p>
                    <p><strong>Travel Date:</strong> %s</p>
                </div>
                <p>Our team will contact you within 24 hours to confirm your booking and provide further details.</p>
                <div class="footer">
                    <p>Best regards,<br>India Tourism Team</p>
                </div>
            </body>
            </html>
            """.formatted(name, destination, packageName, travelDate);
    }

    private String buildContactEmailTemplate(String name) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { color: #e74c3c; text-align: center; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>📧 Message Received!</h2>
                </div>
                <p>Dear %s,</p>
                <p>Thank you for contacting India Tourism! We have received your message and our team will get back to you within 24 hours.</p>
                <p>Best regards,<br>India Tourism Team</p>
            </body>
            </html>
            """.formatted(name);
    }
}