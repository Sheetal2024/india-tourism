import React, { useState, useEffect } from 'react';
import './Hero.css';

// Import your images from the same folder
import hero1 from './hero7.jpg';
import hero2 from './hero2.jpg';
import hero3 from './hero3.jpg';
import hero4 from './hero4.jpg';
import hero5 from './hero5.jpg';
import hero6 from './hero6.jpg';


const Hero = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentBgIndex, setCurrentBgIndex] = useState(0);

    const texts = [
        "Discover Incredible India",
        "Experience Rich Culture",
        "Explore Ancient Heritage",
        "Visit Spiritual Destinations",
        "Adventure in Himalayas",
        "Relax on Beautiful Beaches"
    ];

    // Array of imported images from the same folder
    const backgroundImages = [hero1, hero2, hero3, hero4, hero5, hero6];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
            setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [texts.length, backgroundImages.length]);

    return (
        <section
          id="home"
             className="hero"
             style={{
              backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${backgroundImages[currentBgIndex]})`
                }}
             >

            <div className="hero-overlay">
                <div className="container">
                    <div className="hero-content">
                        <h1>
                            <span className="static-text">India Tourism - </span>
                            <span className="changing-text">{texts[currentTextIndex]}</span>
                        </h1>
                        <p><b>Travel to India for Life Time Experience with us. Discover the incredible diversity of India</b></p>
                        <div className="hero-buttons">
                            <a href="#destinations" className="btn btn-primary">Explore India Tours</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;