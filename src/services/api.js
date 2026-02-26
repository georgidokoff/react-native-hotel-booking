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

// Store logout callback to clear auth when 401 occurs
let logoutCallback = null;

export function setLogoutCallback(callback) {
    logoutCallback = callback;
}

api.interceptors.response.use(
    response => response,
    error => {
        const errorData = error.response?.data;
        const errorCode = errorData?.code;
        const errorMessage = errorData?.message || '';
        const status = error.response?.status;
        
        // Check for token expiration/invalid token errors
        if (errorCode === 3064 || errorMessage.includes('Not existing user token') || status === 401) {
            console.warn('Token invalid or expired. User needs to re-login.', error);
            
            // Call logout callback if available
            if (logoutCallback) {
                logoutCallback();
            }
            
            // Mark error so handlers can identify this issue
            error.isAuthError = true;
        }

        return Promise.reject(error);
    }
);