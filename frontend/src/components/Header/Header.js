import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteCount(storedFavorites.length);

    const updateCount = () => {
      const newFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavoriteCount(newFavorites.length);
    };

    window.addEventListener('favoritesUpdated', updateCount);
    window.addEventListener('storage', updateCount);

    return () => {
      window.removeEventListener('favoritesUpdated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container">
        <div className="nav">
          <div className="logo">
            <h2>Incredible India</h2>
          </div>

          <nav className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#destinations" onClick={closeMenu}>Destinations</a>
            <a href="#favorites" onClick={closeMenu} className="favorites-link">
              Favorite <span className="favorite-count">{favoriteCount}</span>
            </a>
            <a href="#about" onClick={closeMenu}>About Us</a>
            <a href="#testimonials" onClick={closeMenu}>Testimonials</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>

          <div
            className={`hamburger ${isMenuOpen ? 'hamburger-active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
