// frontend/src/services/mockBackend.js

// Mock Database - Stores data in localStorage
const MOCK_DB = {
    bookings: [],
    contacts: [],
    newsletter: []
};

// Initialize mock database from localStorage
const loadMockDB = () => {
    const saved = localStorage.getItem('mock_backend_data');
    if (saved) {
        const parsed = JSON.parse(saved);
        MOCK_DB.bookings = parsed.bookings || [];
        MOCK_DB.contacts = parsed.contacts || [];
        MOCK_DB.newsletter = parsed.newsletter || [];
    }
};

// Save mock database to localStorage
const saveMockDB = () => {
    localStorage.setItem('mock_backend_data', JSON.stringify(MOCK_DB));
};

// Load data on startup
loadMockDB();

// Generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Responses
const mockAPI = {

    // ✅ BOOKING API
    createBooking: async (bookingData) => {
        await delay(800);
        
        const newBooking = {
            id: generateId(),
            bookingId: 'BOOK' + Date.now().toString().slice(-8),
            ...bookingData,
            status: 'CONFIRMED',
            bookingDate: new Date().toISOString(),
            createdAt: new Date().toISOString()
        };

        MOCK_DB.bookings.push(newBooking);
        saveMockDB();

        console.log('✅ Mock Booking Created:', newBooking);

        return {
            success: true,
            message: '🎉 Booking confirmed successfully!',
            data: newBooking
        };
    },

    getBookings: async () => {
        await delay(300);
        return {
            success: true,
            data: MOCK_DB.bookings
        };
    },

    getBookingById: async (id) => {
        await delay(300);
        const booking = MOCK_DB.bookings.find(b => b.id === id || b.bookingId === id);
        return {
            success: true,
            data: booking || null
        };
    },

    updateBookingStatus: async (id, status) => {
        await delay(400);
        const booking = MOCK_DB.bookings.find(b => b.id === id);
        if (booking) {
            booking.status = status;
            saveMockDB();
            return {
                success: true,
                message: 'Booking status updated successfully!',
                data: booking
            };
        }
        return {
            success: false,
            message: 'Booking not found'
        };
    },

    // ✅ CONTACT API
    submitContact: async (contactData) => {
        await delay(700);
        
        const newContact = {
            id: generateId(),
            ...contactData,
            status: 'RECEIVED',
            createdAt: new Date().toISOString()
        };

        MOCK_DB.contacts.push(newContact);
        saveMockDB();

        console.log('✅ Mock Contact Saved:', newContact);

        return {
            success: true,
            message: '✅ Your message has been sent successfully! We will contact you soon.',
            data: newContact
        };
    },

    getContacts: async () => {
        await delay(300);
        return {
            success: true,
            data: MOCK_DB.contacts
        };
    },

    // ✅ NEWSLETTER API
    subscribeNewsletter: async (email) => {
        await delay(500);
        
        const existing = MOCK_DB.newsletter.find(n => n.email === email);
        if (existing) {
            return {
                success: false,
                message: '📧 Email already subscribed!'
            };
        }

        const newSubscription = {
            id: generateId(),
            email: email,
            subscribedAt: new Date().toISOString()
        };

        MOCK_DB.newsletter.push(newSubscription);
        saveMockDB();

        console.log('✅ Mock Newsletter Subscription:', newSubscription);

        return {
            success: true,
            message: '✅ Subscribed successfully! Welcome to our newsletter.',
            data: newSubscription
        };
    },

    unsubscribeNewsletter: async (email) => {
        await delay(400);
        
        const index = MOCK_DB.newsletter.findIndex(n => n.email === email);
        if (index !== -1) {
            MOCK_DB.newsletter.splice(index, 1);
            saveMockDB();
            return {
                success: true,
                message: '✅ Unsubscribed successfully!'
            };
        }
        return {
            success: false,
            message: 'Email not found in subscribers list'
        };
    },

    getNewsletterSubscribers: async () => {
        await delay(300);
        return {
            success: true,
            data: MOCK_DB.newsletter
        };
    },

    // ✅ CLEAR ALL MOCK DATA
    clearAllData: async () => {
        MOCK_DB.bookings = [];
        MOCK_DB.contacts = [];
        MOCK_DB.newsletter = [];
        saveMockDB();
        return {
            success: true,
            message: 'All mock data cleared!'
        };
    },

    // ✅ VIEW ALL MOCK DATA
    viewAllData: () => {
        return {
            bookings: MOCK_DB.bookings,
            contacts: MOCK_DB.contacts,
            newsletter: MOCK_DB.newsletter
        };
    }
};

export default mockAPI;