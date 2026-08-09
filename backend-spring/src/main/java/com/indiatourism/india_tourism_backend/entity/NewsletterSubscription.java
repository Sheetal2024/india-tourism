package com.indiatourism.india_tourism_backend.entity;

import java.time.LocalDateTime;

public class NewsletterSubscription {
    private Long id;
    private String email;
    private LocalDateTime subscriptionDate;
    private Boolean isActive;

    // Constructors
    public NewsletterSubscription() {}

    public NewsletterSubscription(String email) {
        this.email = email;
        this.isActive = true;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public LocalDateTime getSubscriptionDate() { return subscriptionDate; }
    public void setSubscriptionDate(LocalDateTime subscriptionDate) { this.subscriptionDate = subscriptionDate; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}