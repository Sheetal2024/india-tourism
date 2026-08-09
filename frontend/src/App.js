import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Destinations from './components/Destinations/Destinations';
import Favorites from './components/Favorites/Favorites';
import AboutUs from './components/AboutUs/AboutUs';
//import Packages from './components/Packages/Packages';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import  Chatbot from './components/Chatbot/Chatbot'; 

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    {/* ALL routes show the complete website */}
                    <Route path="/" element={<CompleteWebsite defaultSection="home" />} />
                    <Route path="/destinations" element={<CompleteWebsite defaultSection="destinations" />} />
                    <Route path="/favorites" element={<CompleteWebsite defaultSection="favorites" />} />
                    <Route path="/about" element={<CompleteWebsite defaultSection="about" />} />
                    {/* <Route path="/packages" element={<CompleteWebsite defaultSection="packages" />} /> */}
                    <Route path="/testimonials" element={<CompleteWebsite defaultSection="testimonials" />} />
                    <Route path="/contact" element={<CompleteWebsite defaultSection="contact" />} />
                </Routes>
                <Footer />
                 {/* Add Chatbot Component - Fixed corner button */}
                <Chatbot />
            </div>
        </Router>
    );
}

// Complete Website Component - Shows ALL sections
function CompleteWebsite({ defaultSection }) {
    
    // Scroll to the default section when component mounts
    React.useEffect(() => {
        const scrollToSection = () => {
            if (defaultSection && defaultSection !== 'home') {
                const element = document.getElementById(defaultSection);
                if (element) {
                    // Small timeout to ensure DOM is ready
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }
        };

        scrollToSection();
    }, [defaultSection]);

    return (
        <div className="complete-website">
            <section id="home">
                <Hero />
            </section>
            <section id="destinations">
                <Destinations />
            </section>
            <section id="favorites">
                <Favorites />
            </section>
            <section id="about">
                <AboutUs />
            </section>
            {/* <section id="packages">
                <Packages />
            </section> */}
            <section id="testimonials">
                <Testimonials />
            </section>
            <section id="contact">
                <Contact />
            </section>
        </div>
    );
}

export default App;