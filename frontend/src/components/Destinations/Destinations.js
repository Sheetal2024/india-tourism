import React, { useState, useEffect } from 'react';
import { destinations, categories, states, priceRanges } from '../data/destinations';
import DestinationModal from '../DestinationModal/DestinationModal';
import './Destinations.css';

// Import sample images - you can replace these with your actual images
import TajMahal from '../images/destinations/Taj-Mahal2.jpg';
import AgraFort from '../images/destinations/agra-fort.jpg';
import RedFort from '../images/destinations/red-fort.jpg';
import GoaBeach from '../images/destinations/goa_beach.jpg';
import KeralaBackwaters from '../images/destinations/Kerala-Backwaters.jpg';

const Destinations = () => {
    const [filteredDestinations, setFilteredDestinations] = useState(destinations);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedState, setSelectedState] = useState('All States');
    const [selectedPrice, setSelectedPrice] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(12);
    const [sortBy, setSortBy] = useState('featured');
    const [favorites, setFavorites] = useState([]);

    // Map of destination IDs to images
    const destinationImages = {
        1: TajMahal,
        2: AgraFort,
        3: RedFort,
        8: GoaBeach,
        9: KeralaBackwaters,
    };

    // ✅ Load favorites from localStorage and sync when updated
  useEffect(() => {
    const updateFavorites = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(savedFavorites);
    };

    updateFavorites();

    window.addEventListener('favoritesUpdated', updateFavorites);
    window.addEventListener('storage', updateFavorites);

    return () => {
      window.removeEventListener('favoritesUpdated', updateFavorites);
      window.removeEventListener('storage', updateFavorites);
    };
  }, []);

    

    // Toggle favorite status
const toggleFavorite = (destinationId, e) => {
    if (e) e.stopPropagation(); // Prevent triggering explore button
    const newFavorites = favorites.includes(destinationId)
        ? favorites.filter(id => id !== destinationId) // Remove
        : [...favorites, destinationId]; // Add
    
    // Update state and localStorage
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    // 🟢 Save count separately for Header.js (important)
    localStorage.setItem('favoriteCount', newFavorites.length);

    // 🟢 Notify Header and other pages (Favorites.js) to update
    window.dispatchEvent(new Event('favoritesUpdated'));
    window.dispatchEvent(new StorageEvent('storage', { key: 'favoriteCount' }));

    // Trigger update in header component
      window.dispatchEvent(new Event('favoritesUpdated'));

      // 🟢 Also update favorite count in localStorage for Header
     localStorage.setItem('favoriteCount', newFavorites.length);

     // 🟢 Fire a storage event to notify all open pages/components
    window.dispatchEvent(new StorageEvent('storage', { key: 'favoriteCount' }));

};


    // Check if a destination is favorite
    const isFavorite = (destinationId) => {
        return favorites.includes(destinationId);
    };

    // Filter and sort destinations
    useEffect(() => {
        let filtered = [...destinations];

        // Apply filters
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(dest => dest.category === selectedCategory);
        }

        if (selectedState !== 'All States') {
            filtered = filtered.filter(dest => dest.state === selectedState);
        }

        if (selectedPrice !== 'all') {
            const priceRange = priceRanges.find(p => p.id === selectedPrice);
            filtered = filtered.filter(dest => {
                const price = dest.price_numeric;
                return price >= priceRange.min && price <= priceRange.max;
            });
        }

        if (searchTerm) {
            filtered = filtered.filter(dest =>
                dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dest.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dest.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dest.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low-high':
                    return a.price_numeric - b.price_numeric;
                case 'price-high-low':
                    return b.price_numeric - a.price_numeric;
                case 'name-a-z':
                    return a.name.localeCompare(b.name);
                case 'name-z-a':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

        setFilteredDestinations(filtered);
        setVisibleCount(12);
    }, [selectedCategory, selectedState, selectedPrice, searchTerm, sortBy]);

    const handleExplore = (destination) => {
        setSelectedDestination(destination);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDestination(null);
    };

    const handleViewOnMap = (destination) => {
        // Check if coordinates are available
        if (destination.coordinates && destination.coordinates.lat && destination.coordinates.lng) {
            // Use coordinates for precise location
            const { lat, lng } = destination.coordinates;
            const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
            
            console.log('Opening precise location:', destination.name);
            console.log('Coordinates:', lat, lng);
            console.log('Map URL:', mapsUrl);
            window.open(mapsUrl, '_blank');
        } else {
            // Fallback to search if coordinates not available
            const searchQuery = encodeURIComponent(`${destination.name}, ${destination.location}`);
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
            
            console.log('Opening search location:', destination.name);
            console.log('Map URL:', mapsUrl);
            window.open(mapsUrl, '_blank');
        }
    };

    const clearFilters = () => {
        setSelectedCategory('all');
        setSelectedState('All States');
        setSelectedPrice('all');
        setSearchTerm('');
        setSortBy('featured');
    };

    const loadMore = () => {
        setVisibleCount(prev => prev + 12);
    };

    const showLess = () => {
        setVisibleCount(12);
    };

    const getDestinationImage = (destination) => {
        return destinationImages[destination.id] || destination.image;
    };

    const visibleDestinations = filteredDestinations.slice(0, visibleCount);
    const hasMoreDestinations = visibleCount < filteredDestinations.length;
    const hasLessDestinations = visibleCount > 12;

    return (
        <>
            <section id="destinations" className="section destinations">
                <div className="container">
                    <div className="destinations-header">
                        <h2 className="section-title">Explore Incredible India</h2>
                        <p className="section-subtitle">
                            Discover {destinations.length}+ amazing destinations across India with curated travel experiences
                            {favorites.length > 0 && ` • ${favorites.length} in your favorites`}
                        </p>
                    </div>

                    <div className="destinations-layout">
                        {/* Sidebar Filters */}
                        <div className="filters-sidebar">
                            <div className="sidebar-header">
                                <h3>🔍 Find Your Perfect Destination</h3>
                            </div>

                            <div className="sidebar-section">
                                <div className="search-box">
                                    <div className="search-icon">🔍</div>
                                    <input
                                        type="text"
                                        placeholder="Search destinations, locations, states..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <div className="filter-header">
                                    <h4>Filters</h4>
                                    <button className="clear-filters-btn" onClick={clearFilters}>
                                        Clear All
                                    </button>
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <h4>📁 Category</h4>
                                <div className="filter-options">
                                    {categories.map(category => (
                                        <label key={category.id} className="filter-option">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={category.id}
                                                checked={selectedCategory === category.id}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="filter-label">{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <h4>🗺️ State</h4>
                                <div className="filter-options state-options">
                                    {states.slice(0, 10).map(state => (
                                        <label key={state} className="filter-option">
                                            <input
                                                type="radio"
                                                name="state"
                                                value={state}
                                                checked={selectedState === state}
                                                onChange={(e) => setSelectedState(e.target.value)}
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="filter-label">{state}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <h4>💰 Price Range</h4>
                                <div className="filter-options">
                                    {priceRanges.map(range => (
                                        <label key={range.id} className="filter-option">
                                            <input
                                                type="radio"
                                                name="price"
                                                value={range.id}
                                                checked={selectedPrice === range.id}
                                                onChange={(e) => setSelectedPrice(e.target.value)}
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="filter-label">{range.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="destinations-main">
                            <div className="results-header">
                                <div className="results-info">
                                    <p className="results-count">
                                        📍 Showing <strong>{visibleDestinations.length}</strong> of <strong>{filteredDestinations.length}</strong> destinations
                                        {filteredDestinations.length === destinations.length && (
                                            <span className="total-count"> (Total: {destinations.length})</span>
                                        )}
                                    </p>
                                    {filteredDestinations.length > 0 && (
                                        <p className="results-category">
                                            in {selectedCategory === 'all' ? 'All Categories' : categories.find(c => c.id === selectedCategory)?.name}
                                        </p>
                                    )}
                                </div>
                                <div className="sort-options">
                                    <label>Sort by:</label>
                                    <select 
                                        className="sort-select"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-low-high">Price: Low to High</option>
                                        <option value="price-high-low">Price: High to Low</option>
                                        <option value="name-a-z">Name: A to Z</option>
                                        <option value="name-z-a">Name: Z to A</option>
                                    </select>
                                </div>
                            </div>

                            {/* Destinations Grid - 3 Columns */}
                            <div className="destinations-grid">
                                {visibleDestinations.map(destination => (
                                    <div key={destination.id} className="destination-card">
                                        <div className="destination-image-container">
                                            {getDestinationImage(destination) ? (
                                                <img 
                                                    src={getDestinationImage(destination)} 
                                                    alt={destination.name}
                                                    className="destination-card-image"
                                                />
                                            ) : (
                                                <div className="image-placeholder">
                                                    <div className="placeholder-icon">🏞️</div>
                                                    <span>{destination.name}</span>
                                                </div>
                                            )}
                                            
                                            <div className="card-badges">
                                                <span className="category-badge">{destination.category}</span>
                                                <span className="state-badge">{destination.state}</span>
                                            </div>
                                            <div className="price-overlay">
                                                {destination.price_range}
                                            </div>
                                        </div>
                                        
                                        <div className="destination-info">
                                            {/* Destination Title with Favorite Button */}
                                            <div className="destination-title-section">
                                                <h3 className="destination-title">{destination.name}</h3>
                                                <button 
                                                    className="favorite-heart-btn"
                                                    onClick={(e) => toggleFavorite(destination.id, e)}
                                                    title={isFavorite(destination.id) ? 'Remove from favorites' : 'Add to favorites'}
                                                >
                                                    {isFavorite(destination.id) ? '❤️' : '🤍'}
                                                </button>
                                            </div>
                                            
                                            <p className="location">📍 {destination.location}</p>
                                            <p className="description">{destination.description.substring(0, 100)}...</p>
                                            
                                            <div className="destination-meta">
                                                <div className="meta-item">
                                                    <span className="meta-icon">📅</span>
                                                    <div className="meta-content">
                                                        <span className="label">Best Time</span>
                                                        <span className="value">{destination.best_time_to_visit}</span>
                                                    </div>
                                                </div>
                                                <div className="meta-item">
                                                    <span className="meta-icon">⏱️</span>
                                                    <div className="meta-content">
                                                        <span className="label">Duration</span>
                                                        <span className="value">{destination.duration}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="destination-tags">
                                                {destination.tags.slice(0, 2).map((tag, index) => (
                                                    <span key={index} className="tag">{tag}</span>
                                                ))}
                                            </div>

                                            <div className="destination-actions">
                                                <button 
                                                    className="btn btn-explore"
                                                    onClick={() => handleExplore(destination)}
                                                >
                                                    <span className="btn-icon">🔍</span>
                                                    Explore Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Load More / See More Section */}
                            {(hasMoreDestinations || hasLessDestinations) && (
                                <div className="load-more-section">
                                    {hasMoreDestinations && (
                                        <button className="btn btn-load-more" onClick={loadMore}>
                                            <span className="btn-icon">⬇️</span>
                                            See More ({filteredDestinations.length - visibleCount} more destinations)
                                        </button>
                                    )}
                                    {hasLessDestinations && (
                                        <button className="btn btn-show-less" onClick={showLess}>
                                            <span className="btn-icon">⬆️</span>
                                            Show Less
                                        </button>
                                    )}
                                </div>
                            )}

                            {filteredDestinations.length === 0 && (
                                <div className="no-results">
                                    <div className="no-results-icon">🔍</div>
                                    <h3>No destinations found</h3>
                                    <p>Try adjusting your search criteria or filters</p>
                                    <button className="btn btn-primary" onClick={clearFilters}>
                                        Clear All Filters
                                    </button>
                                </div>
                            )}

                            {/* Results Summary */}
                            {filteredDestinations.length > 0 && (
                                <div className="results-summary">
                                    <p>
                                        Displaying {Math.min(visibleCount, filteredDestinations.length)} out of {filteredDestinations.length} destinations
                                        {hasMoreDestinations && ` - ${filteredDestinations.length - visibleCount} more available`}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Destination Modal */}
            {selectedDestination && (
                <DestinationModal 
                    destination={selectedDestination}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onViewOnMap={handleViewOnMap}
                />
            )}
        </>
    );
};

export default Destinations;