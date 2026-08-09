import React, { useState, useEffect } from 'react';
import { destinations } from '../data/destinations';
import DestinationModal from '../DestinationModal/DestinationModal';
import './Favorites.css';

import TajMahal from '../images/destinations/Taj-Mahal2.jpg';
import AgraFort from '../images/destinations/agra-fort.jpg';
import RedFort from '../images/destinations/red-fort.jpg';
import GoaBeach from '../images/destinations/goa_beach.jpg';
import KeralaBackwaters from '../images/destinations/Kerala-Backwaters.jpg';

const Favorites = () => {
  const [favoriteDestinations, setFavoriteDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const destinationImages = {
    1: TajMahal,
    2: AgraFort,
    3: RedFort,
    8: GoaBeach,
    9: KeralaBackwaters,
  };

  // ✅ Fetch favorites from localStorage
  const updateFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favDests = destinations.filter(dest => savedFavorites.includes(dest.id));
    setFavoriteDestinations(favDests);
  };

  // ✅ Load favorites on mount and listen for updates
  useEffect(() => {
    updateFavorites();

    window.addEventListener('favoritesUpdated', updateFavorites);
    window.addEventListener('storage', updateFavorites);

    return () => {
      window.removeEventListener('favoritesUpdated', updateFavorites);
      window.removeEventListener('storage', updateFavorites);
    };
  }, []);

  // ✅ Remove from favorites & update global state
  const toggleFavorite = (destinationId, e) => {
    if (e) e.stopPropagation();

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const newFavorites = savedFavorites.filter(id => id !== destinationId);

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    localStorage.setItem('favoriteCount', newFavorites.length);

    setFavoriteDestinations(destinations.filter(dest => newFavorites.includes(dest.id)));

    // Notify Destination.js & Header
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const getDestinationImage = (destination) =>
    destinationImages[destination.id] || destination.image;

  // ✅ When no favorites are present
  if (favoriteDestinations.length === 0) {
    return (
      <section id="favorites" className="section favorites">
        <div className="container">
          <div className="favorites-header">
            <h2 className="section-title">My Favorites</h2>
            <p className="section-subtitle">
              Your saved destinations will appear here
            </p>
          </div>

          <div className="empty-favorites">
            <div className="empty-icon">🤍</div>
            <h3>No favorites yet</h3>
            <p>
              Start exploring destinations and add them to your favorites by clicking the heart icon!
            </p>
            <a href="#destinations" className="btn btn-primary">
              <span className="btn-icon">🔍</span> Explore Destinations
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ✅ When favorites are present
  return (
    <>
      <section id="favorites" className="section favorites">
        <div className="container">
          <div className="favorites-header">
            <h2 className="section-title">My Favorites</h2>
            <p className="section-subtitle">
              {favoriteDestinations.length} saved destination
              {favoriteDestinations.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="favorites-grid">
            {favoriteDestinations.map(destination => (
              <div key={destination.id} className="destination-card">
                <div className="destination-image-container">
                  <img
                    src={getDestinationImage(destination)}
                    alt={destination.name}
                    className="destination-card-image"
                  />
                </div>

                <div className="destination-info">
                  <div className="destination-title-section">
                    <h3 className="destination-title">{destination.name}</h3>
                    <button
                      className="favorite-heart-btn favorited"
                      onClick={(e) => toggleFavorite(destination.id, e)}
                      title="Remove from favorites"
                    >
                      ❤️
                    </button>
                  </div>

                  <p className="location">📍 {destination.location}</p>
                  <p className="description">
                    {destination.description.substring(0, 100)}...
                  </p>

                  <div className="destination-actions">
                    <button
                      className="btn btn-explore"
                      onClick={() => {
                        setSelectedDestination(destination);
                        setIsModalOpen(true);
                      }}
                    >
                      <span className="btn-icon">🔍</span> Explore Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Favorites;
