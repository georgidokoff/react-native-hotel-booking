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