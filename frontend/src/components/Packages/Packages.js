import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destinations } from '../data/destinations';
import './Packages.css';

const Packages = () => {
    const { destinationId } = useParams();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    useEffect(() => {
        const foundDestination = destinations.find(dest => dest.id === parseInt(destinationId));
        setDestination(foundDestination);
        
        if (foundDestination && foundDestination.packages.length > 0) {
            setSelectedPackage(foundDestination.packages[0]);
        }
    }, [destinationId]);

    const handleViewOnMap = () => {
        if (destination && destination.coordinates) {
            const { lat, lng } = destination.coordinates;
            const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
            window.open(mapsUrl, '_blank');
        }
    };

    const handleBookNow = (pkg) => {
        setSelectedPackage(pkg);
        setIsBookingModalOpen(true);
    };

    const handleConfirmBooking = () => {
        alert(`Booking confirmed for ${selectedPackage.name} - ₹${selectedPackage.price}`);
        setIsBookingModalOpen(false);
    };

    if (!destination) {
        return (
            <div className="packages-container">
                <div className="container">
                    <div className="destination-not-found">
                        <h2>Destination Not Found</h2>
                        <button onClick={() => navigate('/destinations')} className="btn btn-primary">
                            Back to Destinations
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="packages-container">
            <div className="container">
                {/* Header Section */}
                <div className="packages-header">
                    <button onClick={() => navigate('/destinations')} className="back-button">
                        ← Back to Destinations
                    </button>
                    <h1>{destination.name} - Packages</h1>
                    <p className="location">📍 {destination.location}, {destination.state}</p>
                </div>

                <div className="packages-layout">
                    {/* Destination Info Sidebar with Image */}
                    <div className="destination-sidebar">
                        <div className="sidebar-card">
                            <div className="destination-image-sidebar">
                                {destination.image ? (
                                    <img 
                                        src={destination.image} 
                                        alt={destination.name}
                                        className="sidebar-main-image"
                                    />
                                ) : (
                                    <div className="image-placeholder">
                                        {destination.name}
                                    </div>
                                )}
                                <div className="sidebar-badges">
                                    <span className="category-badge">{destination.category}</span>
                                    <span className="state-badge">{destination.state}</span>
                                </div>
                            </div>
                            <div className="destination-info-sidebar">
                                <h3>About {destination.name}</h3>
                                <p>{destination.description}</p>
                                
                                <div className="destination-details">
                                    <div className="detail-item">
                                        <span className="label">Best Time:</span>
                                        <span className="value">{destination.best_time_to_visit}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Category:</span>
                                        <span className="value">{destination.category}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Duration:</span>
                                        <span className="value">{destination.duration}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Price Range:</span>
                                        <span className="value price">{destination.price_range}</span>
                                    </div>
                                </div>

                                <div className="destination-highlights">
                                    <h4>Highlights</h4>
                                    <ul>
                                        {destination.highlights.map((highlight, index) => (
                                            <li key={index}>✓ {highlight}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="destination-tags">
                                    <h4>Tags</h4>
                                    <div className="tags-container">
                                        {destination.tags.map((tag, index) => (
                                            <span key={index} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <button className="btn btn-outline" onClick={handleViewOnMap}>
                                    📍 View on Map
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Packages Main Content */}
                    <div className="packages-main">
                        <div className="packages-section">
                            <h2>Available Packages</h2>
                            <p className="section-subtitle">Choose the perfect package for your {destination.name} experience</p>

                            <div className="packages-grid">
                                {destination.packages.map((pkg) => (
                                    <div key={pkg.id} className="package-card">
                                        <div className="package-header">
                                            <h3>{pkg.name}</h3>
                                            <div className="package-price">
                                                {pkg.price === 0 ? 'Free' : `₹${pkg.price}`}
                                            </div>
                                        </div>
                                        <div className="package-type">{pkg.type.toUpperCase()} PACKAGE</div>
                                        <div className="package-duration">⏱️ {pkg.duration}</div>
                                        
                                        <div className="package-description">
                                            <p>{pkg.description}</p>
                                        </div>

                                        <div className="package-features">
                                            <h4>Package Features:</h4>
                                            <ul>
                                                {pkg.features.map((feature, index) => (
                                                    <li key={index}>✨ {feature}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="package-inclusions">
                                            <h4>What's Included:</h4>
                                            <ul>
                                                {pkg.inclusions.map((inclusion, index) => (
                                                    <li key={index}>✅ {inclusion}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="package-itinerary">
                                            <h4>Itinerary:</h4>
                                            <ul>
                                                {pkg.itinerary.map((item, index) => (
                                                    <li key={index}>🕒 {item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="package-actions">
                                            <button 
                                                className="btn btn-book"
                                                onClick={() => handleBookNow(pkg)}
                                            >
                                                {pkg.price === 0 ? 'Book Free Package' : `Book Now - ₹${pkg.price}`}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {isBookingModalOpen && selectedPackage && (
                <div className="booking-modal-overlay">
                    <div className="booking-modal">
                        <h3>Confirm Your Booking</h3>
                        <div className="booking-details">
                            <h4>{selectedPackage.name}</h4>
                            <p><strong>Destination:</strong> {destination.name}</p>
                            <p><strong>Duration:</strong> {selectedPackage.duration}</p>
                            <p><strong>Price:</strong> {selectedPackage.price === 0 ? 'Free' : `₹${selectedPackage.price}`}</p>
                            <p><strong>Type:</strong> {selectedPackage.type.toUpperCase()} Package</p>
                        </div>
                        <div className="booking-actions">
                            <button 
                                className="btn btn-secondary"
                                onClick={() => setIsBookingModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn btn-primary"
                                onClick={handleConfirmBooking}
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Packages;