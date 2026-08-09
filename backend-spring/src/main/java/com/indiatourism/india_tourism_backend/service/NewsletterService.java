package com.indiatourism.india_tourism_backend.service;

import com.indiatourism.india_tourism_backend.entity.NewsletterSubscription;
import com.indiatourism.india_tourism_backend.repository.NewsletterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsletterService {

    @Autowired
    private NewsletterRepository newsletterRepository;

    public NewsletterSubscription subscribe(String email) {
        NewsletterSubscription subscription = new NewsletterSubscription(email);
        return newsletterRepository.subscribe(subscription);
    }

    public void unsubscribe(String email) {
        newsletterRepository.unsubscribe(email);
    }

    public List<NewsletterSubscription> getActiveSubscribers() {
        return newsletterRepository.findAllActive();
    }

    public int getActiveSubscriberCount() {
        return newsletterRepository.countActive();
    }

    public Optional<NewsletterSubscription> getSubscriptionByEmail(String email) {
        return newsletterRepository.findByEmail(email);
    }
}