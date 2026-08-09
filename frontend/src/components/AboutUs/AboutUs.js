import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <section id="about" className="about-us">
            <div className="container">
                <div className="about-header">
                    <h2>About Incredible India Tourism</h2>
                    <p className="about-subtitle">Discover the soul of India with us</p>
                </div>

                <div className="about-content">
                    <div className="about-text">
                        <div className="about-section">
                            <h3>Our Story</h3>
                            <p>
                                Welcome to Incredible India Tourism, your trusted partner in exploring the rich tapestry 
                                of India's cultural heritage, natural wonders, and spiritual destinations. Founded with 
                                a passion for showcasing India's diversity, we have been creating unforgettable travel 
                                experiences for visitors from around the world.
                            </p>
                        </div>

                        <div className="about-section">
                            <h3>Our Mission</h3>
                            <p>
                                To provide authentic, immersive, and sustainable travel experiences that connect 
                                travelers with the heart and soul of India. We believe in responsible tourism that 
                                benefits local communities while preserving India's cultural and natural heritage 
                                for future generations.
                            </p>
                        </div>

                        <div className="about-section">
                            <h3>Why Choose Us?</h3>
                            <div className="features-grid">
                                <div className="feature-card">
                                    <div className="feature-icon">🌍</div>
                                    <h4>Local Expertise</h4>
                                    <p>Deep knowledge of Indian culture, traditions, and hidden gems</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon">✨</div>
                                    <h4>Curated Experiences</h4>
                                    <p>Handpicked destinations and authentic local experiences</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon">🛡️</div>
                                    <h4>Safe & Reliable</h4>
                                    <p>Verified accommodations and trusted local guides</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon">💝</div>
                                    <h4>Personalized Service</h4>
                                    <p>Customized itineraries tailored to your preferences</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about-stats">
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-number">50,000+</div>
                                <div className="stat-label">Happy Travelers</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">100+</div>
                                <div className="stat-label">Destinations</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">15+</div>
                                <div className="stat-label">Years Experience</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">24/7</div>
                                <div className="stat-label">Customer Support</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="team-section">
                    <h3>Our Promise</h3>
                    <div className="promise-cards">
                        <div className="promise-card">
                            <div className="promise-icon">🏛️</div>
                            <h4>Cultural Immersion</h4>
                            <p>Experience India's rich heritage through authentic cultural interactions, traditional arts, and local festivals.</p>
                        </div>
                        <div className="promise-card">
                            <div className="promise-icon">🌿</div>
                            <h4>Sustainable Tourism</h4>
                            <p>We promote eco-friendly practices and support local communities to preserve India's natural beauty.</p>
                        </div>
                        <div className="promise-card">
                            <div className="promise-icon">🕉️</div>
                            <h4>Spiritual Journeys</h4>
                            <p>Discover India's spiritual essence through ancient temples, meditation retreats, and yoga experiences.</p>
                        </div>
                    </div>
                </div>

                <div className="cta-section">
                    <h3>Ready to Explore India?</h3>
                    <p>Let us help you create memories that will last a lifetime</p>
                    <div className="cta-buttons">
                        <a href="#destinations" className="btn btn-primary">Explore Destinations</a>
                        <a href="#contact" className="btn btn-secondary">Contact Us</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;