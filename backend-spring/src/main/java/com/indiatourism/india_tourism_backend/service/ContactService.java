package com.indiatourism.india_tourism_backend.service;

import com.indiatourism.india_tourism_backend.entity.ContactMessage;
import com.indiatourism.india_tourism_backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private EmailService emailService;

    public ContactMessage saveMessage(ContactMessage contactMessage) {
        try{
            ContactMessage savedMessage = contactRepository.save(contactMessage);
            
        
        
        
        // Send confirmation to user
        emailService.sendContactConfirmation(
            savedMessage.getEmail(),
            savedMessage.getName()
        );
        
        // Send notification to admin
        emailService.sendAdminNotification(
            savedMessage.getName(),
            savedMessage.getEmail(),
            savedMessage.getSubject(),
            savedMessage.getMessage()
        );
        
        return savedMessage;

        } catch (Exception e) {
            System.err.println("❌ Error saving contact: " + e.getMessage());
            throw e;
        }
    }

    public List<ContactMessage> getAllMessages() {
        return contactRepository.findAll();
    }

    public Optional<ContactMessage> getMessageById(Long id) {
        return contactRepository.findById(id);
    }

    public void updateMessageStatus(Long id, String status) {
        contactRepository.updateStatus(id, status);
    }
}