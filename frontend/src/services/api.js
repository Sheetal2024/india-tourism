const API_BASE_URL = 'http://localhost:8080/api';

// Enhanced fetch with error handling
const fetchWithErrorHandling = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

export const apiService = {
    // Health check
    async healthCheck() {
        return await fetchWithErrorHandling(`${API_BASE_URL}/health`);
    },

    // Bookings - Spring Boot endpoints
    async createBooking(bookingData) {
        return await fetchWithErrorHandling(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            body: JSON.stringify(bookingData),
        });
    },

    async getAllBookings() {
        return await fetchWithErrorHandling(`${API_BASE_URL}/bookings`);
    },

    async getBookingById(id) {
        return await fetchWithErrorHandling(`${API_BASE_URL}/bookings/${id}`);
    },

    async updateBookingStatus(id, status) {
        return await fetchWithErrorHandling(`${API_BASE_URL}/bookings/${id}/status?status=${status}`, {
            method: 'PUT',
        });
    },

    // Contact - Spring Boot endpoints
    async submitContact(formData) {
        return await fetchWithErrorHandling(`${API_BASE_URL}/contact`, {
            method: 'POST',
            body: JSON.stringify(formData),
        });
    },

    async getAllContactMessages() {
        return await fetchWithErrorHandling(`${API_BASE_URL}/contact`);
    },

    // Newsletter - Spring Boot endpoints
    async subscribeNewsletter(email) {
        return await fetchWithErrorHandling(`${API_BASE_URL}/newsletter/subscribe`, {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    },

    async unsubscribeNewsletter(email) {
        return await fetchWithErrorHandling(`${API_BASE_URL}/newsletter/unsubscribe`, {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    },

    async getNewsletterSubscribers() {
        return await fetchWithErrorHandling(`${API_BASE_URL}/newsletter/subscribers`);
    },

    // Destinations (if you want to serve from backend later)
    async getDestinations() {
        // For now, this can remain empty or serve from frontend
        return { success: true, data: [] };
    },

    // Packages (if you want to serve from backend later)
    async getPackages() {
        // For now, this can remain empty or serve from frontend
        return { success: true, data: [] };
    },

    // Testimonials (if you want to add backend support later)
    async getTestimonials() {
        // For now, this can remain empty
        return { success: true, data: [] };
    },

    async submitTestimonial(testimonialData) {
        // You can implement this later when you add testimonial endpoints
        console.log('Submit testimonial:', testimonialData);
        return { success: true, message: 'Testimonial submitted successfully' };
    },

    // Authentication (optional - you can add later)
    async register(userData) {
        // Implement when you add authentication
        console.log('Register:', userData);
        return { success: true, message: 'Registration successful' };
    },

    async login(credentials) {
        // Implement when you add authentication
        console.log('Login:', credentials);
        return { success: true, token: 'dummy-token', user: { name: 'User' } };
    },

    async getUserProfile() {
        // Implement when you add authentication
        return { success: true, user: { name: 'User', email: 'user@example.com' } };
    },

    async getUserBookings() {
        // For now, return all bookings since we don't have user authentication
        return await this.getAllBookings();
    },
};

// Alternative export style for individual functions
export const bookingAPI = {
    createBooking: apiService.createBooking,
    getAllBookings: apiService.getAllBookings,
    getBookingById: apiService.getBookingById,
    updateBookingStatus: apiService.updateBookingStatus,
};

export const contactAPI = {
    submitContact: apiService.submitContact,
    getAllMessages: apiService.getAllContactMessages,
};

export const newsletterAPI = {
    subscribe: apiService.subscribeNewsletter,
    unsubscribe: apiService.unsubscribeNewsletter,
    getSubscribers: apiService.getNewsletterSubscribers,
};

export const healthCheck = apiService.healthCheck;

// Test function to verify all endpoints
export const testAllEndpoints = async () => {
    try {
        console.log('🧪 Testing Spring Boot API endpoints...');

        // Test health endpoint
        const health = await apiService.healthCheck();
        console.log('✅ Health check:', health);

        // Test bookings endpoint
        const bookings = await apiService.getAllBookings();
        console.log('✅ Bookings endpoint:', bookings);

        // Test contact endpoint
        const contacts = await apiService.getAllContactMessages();
        console.log('✅ Contact endpoint:', contacts);

        // Test newsletter endpoint
        const subscribers = await apiService.getNewsletterSubscribers();
        console.log('✅ Newsletter endpoint:', subscribers);

        console.log('🎉 All API endpoints are working correctly!');
        return true;
    } catch (error) {
        console.error('❌ API test failed:', error);
        console.log('💡 Make sure your Spring Boot backend is running on http://localhost:8080');
        return false;
    }
};

export default apiService;