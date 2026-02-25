import axios from 'axios';

export const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 5000, 
});

export const authApi = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: process.env.EXPO_PUBLIC_API_URL_AUTH,
    timeout: 5000, 
});

// Error interceptor for handling token expiration
api.interceptors.response.use(
    response => response,
    error => {
        const errorData = error.response?.data;
        const errorCode = errorData?.code;
        const errorMessage = errorData?.message || '';

        // Check for token expiration error (code 3064)
        if (errorCode === 3064 || errorMessage.includes('Not existing user token')) {
            // Token has expired, mark it for refresh
            error.tokenExpired = true;
        }

        return Promise.reject(error);
    }
);