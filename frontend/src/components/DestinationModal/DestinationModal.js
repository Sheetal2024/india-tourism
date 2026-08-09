import React, { useState } from 'react';
import { apiService } from '../../services/api'; 
import './DestinationModal.css';

const DestinationModal = ({ destination, isOpen, onClose, onViewOnMap }) => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        phone: '',
        travelDate: '',
        travelers: 1,
        requests: ''
    });

    // Early return if modal is not open or no destination
    if (!isOpen || !destination) return null;

    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg);
    };

    const handleBookNow = (pkg) => {
        setSelectedPackage(pkg);
        setShowBookingForm(true);
    };

   const handleBookingSubmit = async (e) => {
    e.preventDefault();
    console.log('Starting booking submission...');
    
    try {
        // Check if selectedPackage exists
        if (!selectedPackage) {
            alert('❌ Please select a package first.');
            return;
        }

        const bookingPayload = {
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            destinationName: destination.name,
            packageName: selectedPackage.name,
            packagePrice: selectedPackage.price,
            travelDate: bookingData.travelDate,
            numberOfTravelers: parseInt(bookingData.travelers),
            specialRequests: bookingData.requests || ''
        };

        console.log('Booking payload:', bookingPayload);

        // Use the API service without authentication
        const result = await apiService.createBooking(bookingPayload);
        
        console.log('Response data:', result);
        
        if (result.success) {
            alert('✅ Booking submitted successfully! Check your email for confirmation.');
            setShowBookingForm(false);
            setSelectedPackage(null);
            setBookingData({
                name: '',
                email: '',
                phone: '',
                travelDate: '',
                travelers: 1,
                requests: ''
            });
        } else {
            alert('❌ Booking failed: ' + result.message);
        }
    } catch (error) {
        console.error('Booking error details:', error);
        alert('❌ Failed to submit booking. Please check console for details.');
    }
};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Safe coordinate check
    const hasCoordinates = destination?.coordinates && 
                          destination.coordinates.lat && 
                          destination.coordinates.lng;

    // Safe array checks
    const tags = destination.tags || [];
    const highlights = destination.highlights || [];
    const packages = destination.packages || [];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-header">
                    <div className="destination-image">
                        <img src={destination.image} alt={destination.name} />
                        {!hasCoordinates && (
                            <div className="coordinate-warning">
                                <span>📍 Approximate location</span>
                            </div>
                        )}
                    </div>
                    <div className="destination-header-info">
                        <h2>{destination.name}</h2>
                        <p className="location">📍 {destination.location}</p>
                        {hasCoordinates && (
                            <p className="coordinates">
                                📍 Coordinates: {destination.coordinates.lat.toFixed(4)}, {destination.coordinates.lng.toFixed(4)}
                            </p>
                        )}
                        <div className="destination-tags">
                            {tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="destination-details">
                        <div className="detail-section">
                            <h3>About</h3>
                            <p>{destination.description}</p>
                        </div>

                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label">Best Time to Visit</span>
                                <span className="detail-value">{destination.best_time_to_visit}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Recommended Duration</span>
                                <span className="detail-value">{destination.duration}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Price Range</span>
                                <span className="detail-value price-highlight">{destination.price_range}</span>
                            </div>
                            {hasCoordinates && (
                                <div className="detail-item">
                                    <span className="detail-label">Coordinates</span>
                                    <span className="detail-value coordinate">
                                        {destination.coordinates.lat.toFixed(4)}, {destination.coordinates.lng.toFixed(4)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="detail-section">
                            <h3>Highlights</h3>
                            <div className="highlights-list">
                                {highlights.map((highlight, index) => (
                                    <div key={index} className="highlight-item">
                                        <span className="highlight-icon">⭐</span>
                                        <span>{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Packages Section */}
                    <div className="packages-section">
                        <h3>Available Packages</h3>
                        <div className="packages-grid">
                            {packages.map((pkg) => (
                                <div key={pkg.id} className="package-card">
                                    <div className="package-header">
                                        <h4>{pkg.name}</h4>
                                        <div className="package-price">
                                            {pkg.price === 0 ? 'Free' : `₹${pkg.price}`}
                                        </div>
                                    </div>
                                    <div className="package-duration">
                                        <span className="duration-icon">⏱️</span>
                                        {pkg.duration}
                                    </div>
                                    <p className="package-description">{pkg.description}</p>
                                    
                                    <div className="package-features">
                                        <h5>What's Included:</h5>
                                        <ul>
                                            {(pkg.inclusions || []).map((inclusion, index) => (
                                                <li key={index}>✓ {inclusion}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="package-actions">
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => handleBookNow(pkg)}
                                        >
                                            Book Now
                                        </button>
                                        <button 
                                            className="btn btn-secondary"
                                            onClick={() => handlePackageSelect(pkg)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Package Detail Modal */}
                    {selectedPackage && !showBookingForm && (
                        <div className="package-modal-overlay">
                            <div className="package-modal">
                                <div className="package-modal-header">
                                    <h3>{selectedPackage.name}</h3>
                                    <button onClick={() => setSelectedPackage(null)}>×</button>
                                </div>
                                <div className="package-modal-body">
                                    <div className="package-info">
                                        <div className="package-price-duration">
                                            <span className="price">
                                                {selectedPackage.price === 0 ? 'Free' : `₹${selectedPackage.price}`}
                                            </span>
                                            <span className="duration">{selectedPackage.duration}</span>
                                        </div>
                                        <p className="package-description">{selectedPackage.description}</p>
                                        
                                        <div className="package-details">
                                            <div className="detail-column">
                                                <h4>Features</h4>
                                                <ul>
                                                    {(selectedPackage.features || []).map((feature, index) => (
                                                        <li key={index}>✨ {feature}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="detail-column">
                                                <h4>Inclusions</h4>
                                                <ul>
                                                    {(selectedPackage.inclusions || []).map((inclusion, index) => (
                                                        <li key={index}>✓ {inclusion}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="itinerary-section">
                                            <h4>Itinerary</h4>
                                            <div className="itinerary">
                                                {(selectedPackage.itinerary || []).map((item, index) => (
                                                    <div key={index} className="itinerary-item">
                                                        <span className="time">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="package-modal-footer">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => setShowBookingForm(true)}
                                    >
                                        {selectedPackage.price === 0 ? 'Get This Package' : `Book This Package - ₹${selectedPackage.price}`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Booking Form Modal */}
                    {showBookingForm && selectedPackage && (
                        <div className="package-modal-overlay">
                            <div className="package-modal booking-form-modal">
                                <div className="package-modal-header">
                                    <h3>Book {selectedPackage.name}</h3>
                                    <button onClick={() => setShowBookingForm(false)}>×</button>
                                </div>
                                <div className="package-modal-body">
                                    <form onSubmit={handleBookingSubmit} className="booking-form">
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={bookingData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email Address *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={bookingData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your email"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number *</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={bookingData.phone}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your phone number"
                                            />
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="travelDate">Travel Date *</label>
                                                <input
                                                    type="date"
                                                    id="travelDate"
                                                    name="travelDate"
                                                    value={bookingData.travelDate}
                                                    onChange={handleInputChange}
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="travelers">Number of Travelers *</label>
                                                <select
                                                    id="travelers"
                                                    name="travelers"
                                                    value={bookingData.travelers}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                                        <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="requests">Special Requests</label>
                                            <textarea
                                                id="requests"
                                                name="requests"
                                                value={bookingData.requests}
                                                onChange={handleInputChange}
                                                placeholder="Any special requirements or requests..."
                                                rows="3"
                                            />
                                        </div>

                                        <div className="booking-summary">
                                            <h4>Booking Summary</h4>
                                            <div className="summary-item">
                                                <span>Destination:</span>
                                                <span>{destination.name}</span>
                                            </div>
                                            <div className="summary-item">
                                                <span>Package:</span>
                                                <span>{selectedPackage.name}</span>
                                            </div>
                                            <div className="summary-item">
                                                <span>Price:</span>
                                                <span>{selectedPackage.price === 0 ? 'Free' : `₹${selectedPackage.price}`}</span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="package-modal-footer">
                                    <button 
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowBookingForm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={handleBookingSubmit}
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => onViewOnMap(destination)}
                        title={hasCoordinates ? "View precise location on map" : "Search location on map"}
                    >
                        {hasCoordinates ? '📍 View Exact Location' : '🔍 Find on Map'}
                    </button>
                    <button className="btn btn-primary" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DestinationModal;