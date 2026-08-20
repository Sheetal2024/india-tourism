// frontend/src/services/api.js

import mockAPI from './mockBackend';

const API_BASE_URL = 'http://localhost:8080/api';

// ✅ AUTO-DETECT: Check if backend is running
let isBackendAvailable = null;
let isCheckingBackend = false;

// ✅ Function to check backend health
const checkBackendHealth = async () => {
    if (isCheckingBackend) return isBackendAvailable;
    
    isCheckingBackend = true;
    try {
        const response = await fetch(`${API_BASE_URL}/health`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(3000) // 3 second timeout
        });
        isBackendAvailable = response.ok;
        console.log(`🌐 Backend ${isBackendAvailable ? '✅ Available' : '❌ Not Available'}`);
    } catch (error) {
        isBackendAvailable = false;
        console.log('🌐 Backend ❌ Not Available (Using Mock)');
    } finally {
        isCheckingBackend = false;
    }
    return isBackendAvailable;
};

// ✅ Smart fetch with auto mock fallback
const smartFetch = async (url, options = {}, mockFunction) => {
    try {
        // Check if backend is available
        const backendAvailable = await checkBackendHealth();
        
        if (backendAvailable) {
            // ✅ USE REAL BACKEND
            console.log('🌐 Using Real Backend:', url);
            
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Backend Response:', data);
            return data;
        } else {
            // ❌ BACKEND NOT AVAILABLE - USE MOCK
            console.log('🔄 Backend unavailable, using Mock');
            return await mockFunction();
        }
        
    } catch (error) {
        // ❌ ERROR - USE MOCK AS FALLBACK
        console.log('⚠️ Backend error, using Mock:', error.message);
        return await mockFunction();
    }
};

// Mock functions for each API call
const mockFunctions = {
    createBooking: (data) => mockAPI.createBooking(data),
    getAllBookings: () => mockAPI.getBookings(),
    getBookingById: (id) => mockAPI.getBookingById(id),
    updateBookingStatus: (id, status) => mockAPI.updateBookingStatus(id, status),
    submitContact: (data) => mockAPI.submitContact(data),
    getAllContactMessages: () => mockAPI.getContacts(),
    subscribeNewsletter: (email) => mockAPI.subscribeNewsletter(email),
    unsubscribeNewsletter: (email) => mockAPI.unsubscribeNewsletter(email),
    getNewsletterSubscribers: () => mockAPI.getNewsletterSubscribers(),
    healthCheck: () => Promise.resolve({ status: 'ok', mock: true }),
};

export const apiService = {
    // Health check
    async healthCheck() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`, {
                method: 'GET',
                signal: AbortSignal.timeout(3000)
            });
            return response.ok;
        } catch {
            return false;
        }
    },

    // ✅ Bookings
    async createBooking(bookingData) {
        return await smartFetch(
            `${API_BASE_URL}/bookings`,
            {
                method: 'POST',
                body: JSON.stringify(bookingData),
            },
            () => mockFunctions.createBooking(bookingData)
        );
    },

    async getAllBookings() {
        return await smartFetch(
            `${API_BASE_URL}/bookings`,
            { method: 'GET' },
            mockFunctions.getAllBookings
        );
    },

    async getBookingById(id) {
        return await smartFetch(
            `${API_BASE_URL}/bookings/${id}`,
            { method: 'GET' },
            () => mockFunctions.getBookingById(id)
        );
    },

    async updateBookingStatus(id, status) {
        return await smartFetch(
            `${API_BASE_URL}/bookings/${id}/status?status=${status}`,
            { method: 'PUT' },
            () => mockFunctions.updateBookingStatus(id, status)
        );
    },

    // ✅ Contact
    async submitContact(formData) {
        return await smartFetch(
            `${API_BASE_URL}/contact`,
            {
                method: 'POST',
                body: JSON.stringify(formData),
            },
            () => mockFunctions.submitContact(formData)
        );
    },

    async getAllContactMessages() {
        return await smartFetch(
            `${API_BASE_URL}/contact`,
            { method: 'GET' },
            mockFunctions.getAllContactMessages
        );
    },

    // ✅ Newsletter
    async subscribeNewsletter(email) {
        return await smartFetch(
            `${API_BASE_URL}/newsletter/subscribe`,
            {
                method: 'POST',
                body: JSON.stringify({ email }),
            },
            () => mockFunctions.subscribeNewsletter(email)
        );
    },

    async unsubscribeNewsletter(email) {
        return await smartFetch(
            `${API_BASE_URL}/newsletter/unsubscribe`,
            {
                method: 'POST',
                body: JSON.stringify({ email }),
            },
            () => mockFunctions.unsubscribeNewsletter(email)
        );
    },

    async getNewsletterSubscribers() {
        return await smartFetch(
            `${API_BASE_URL}/newsletter/subscribers`,
            { method: 'GET' },
            mockFunctions.getNewsletterSubscribers
        );
    },

    // ✅ Destinations (if you want to serve from backend later)
    async getDestinations() {
        return { success: true, data: [] };
    },

    // ✅ Packages (if you want to serve from backend later)
    async getPackages() {
        return { success: true, data: [] };
    },

    // ✅ Testimonials (if you want to add backend support later)
    async getTestimonials() {
        return { success: true, data: [] };
    },

    async submitTestimonial(testimonialData) {
        console.log('Submit testimonial:', testimonialData);
        return { success: true, message: 'Testimonial submitted successfully' };
    },

    // ✅ Authentication (optional - you can add later)
    async register(userData) {
        console.log('Register:', userData);
        return { success: true, message: 'Registration successful' };
    },

    async login(credentials) {
        console.log('Login:', credentials);
        return { success: true, token: 'dummy-token', user: { name: 'User' } };
    },

    async getUserProfile() {
        return { success: true, user: { name: 'User', email: 'user@example.com' } };
    },

    async getUserBookings() {
        return await this.getAllBookings();
    },
};

// Export individual APIs
export const bookingAPI = {
    createBooking: (data) => apiService.createBooking(data),
    getAllBookings: () => apiService.getAllBookings(),
    getBookingById: (id) => apiService.getBookingById(id),
    updateBookingStatus: (id, status) => apiService.updateBookingStatus(id, status),
};

export const contactAPI = {
    submitContact: (data) => apiService.submitContact(data),
    getAllMessages: () => apiService.getAllContactMessages(),
};

export const newsletterAPI = {
    subscribe: (email) => apiService.subscribeNewsletter(email),
    unsubscribe: (email) => apiService.unsubscribeNewsletter(email),
    getSubscribers: () => apiService.getNewsletterSubscribers(),
};

export const healthCheck = apiService.healthCheck;

// ✅ Mock Debug Functions
export const mockDebug = {
    viewAllData: () => mockAPI.viewAllData(),
    clearAllData: async () => {
        const result = await mockAPI.clearAllData();
        console.log('✅ Mock data cleared:', result);
        return result;
    },
    getBookings: () => mockAPI.getBookings(),
    getContacts: () => mockAPI.getContacts(),
    getNewsletter: () => mockAPI.getNewsletterSubscribers(),
    getBackendStatus: async () => {
        const status = await apiService.healthCheck();
        return status ? '🟢 REAL BACKEND' : '🟡 MOCK BACKEND';
    }
};

// ✅ Test function
export const testAllEndpoints = async () => {
    try {
        console.log('🧪 Testing API endpoints...');
        
        const backendStatus = await apiService.healthCheck();
        console.log(`📌 Mode: ${backendStatus ? '🟢 REAL' : '🟡 MOCK'}`);

        const bookings = await apiService.getAllBookings();
        console.log('✅ Bookings:', bookings);

        const contacts = await apiService.getAllContactMessages();
        console.log('✅ Contacts:', contacts);

        const subscribers = await apiService.getNewsletterSubscribers();
        console.log('✅ Newsletter:', subscribers);

        console.log('🎉 All API endpoints are working!');
        return true;
    } catch (error) {
        console.error('❌ API test failed:', error);
        return false;
    }
};

export default apiService;