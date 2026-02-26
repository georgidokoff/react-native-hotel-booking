import { authApi, api } from "./api.js";

export async function callLogin(login, password) {
    try {
        const result = await authApi.post('/login', { login, password });

        return result.data;
    } catch (err) {
        throw err;
    }
}

export async function callRegister(email, password, name) {
    try {
        if (!name) {
            name = email.split('@')[0];
        }

        const result = await authApi.post('/register', { email, password, name });

        return result.data;
    } catch (err) {
        throw err;
    }
}

export async function callLoginGuest() {
    try {
        const result = await authApi.post('/register/guest', {});

        return result.data;
    } catch (err) {
        throw err;
    }
}

export async function callLogout(accessToken) {
    try {
        authApi.defaults.headers.common['user-token'] = accessToken;

        const result = await authApi.get(`/logout`);

        return result.data;
    } catch (err) {
        throw err;
    }
}