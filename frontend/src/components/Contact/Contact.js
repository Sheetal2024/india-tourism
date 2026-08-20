// src/components/Contact/Contact.js
import React, { useState } from 'react';
import { contactAPI } from '../../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('⚠️ Please fill all required fields');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('⚠️ Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || `Contact from ${formData.name}`,
        message: formData.message
      };

      console.log('📤 Sending contact:', payload);

      // Using contactAPI which automatically uses mock if backend not available
      const result = await contactAPI.submitContact(payload);
      
      console.log('📥 Contact response:', result);
      
      if (result.success) {
        setSuccess(true);
        alert('✅ Message sent successfully! We will get back to you soon.');
        setFormData({ 
          name: '', 
          email: '', 
          subject: '', 
          message: '' 
        });
        
        // Reset success after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('❌ ' + (result.message || 'Failed to send message'));
      }
    } catch (error) {
      console.error('❌ Contact form error:', error);
      setError('❌ Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Ready to plan your Indian adventure? Contact us today!
        </p>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <strong>Email:</strong> info@indiatourism.com
            </div>
            <div className="contact-item">
              <strong>Phone:</strong> +91 9876543210
            </div>
            <div className="contact-item">
              <strong>Address:</strong> 123 Travel Street, Mumbai, India
            </div>
            <div className="contact-features">
              <h4>Why Choose Us?</h4>
              <ul>
                <li>✅ 24/7 Customer Support</li>
                <li>✅ Customized Travel Packages</li>
                <li>✅ Best Price Guarantee</li>
                <li>✅ Expert Local Guides</li>
              </ul>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">✅ Message sent successfully!</div>}
            
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Full Name *"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject (Optional)"
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message *"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? '⏳ Sending...' : '📤 Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;