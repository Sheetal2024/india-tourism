// src/components/Testimonials/Testimonials.js
import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    text: "The Kerala backwaters tour was absolutely magical! The houseboat experience exceeded all expectations.",
    rating: 5
  },
  {
    id: 2,
    name: "Raj Patel",
    location: "Delhi",
    text: "Golden Triangle package was well-organized. We saw all the major attractions without any hassle.",
    rating: 4
  },
  {
    id: 3,
    name: "Anita Das",
    location: "Kolkata",
    text: "Himalayan adventure was thrilling! The guides were knowledgeable and the scenery was breathtaking.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <h2 className="section-title">What Travelers Say</h2>
        <p className="section-subtitle">
          Hear from our satisfied customers about their Indian travel experiences
        </p>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="stars">
                {'★'.repeat(testimonial.rating)}
                {'☆'.repeat(5 - testimonial.rating)}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;