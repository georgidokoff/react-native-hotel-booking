import {
    api
} from "./api.js";

export async function getById(userId, accessToken) {
    try {
        api.defaults.headers.common['user-token'] = accessToken;
        const result = await api.get(`/users/${userId}`);
        return result.data;
    } catch (err) {
        throw err;
    }
}

export async function update(userData, accessToken) {
    try {
        api.defaults.headers.common['user-token'] = accessToken;

        const id = userData.id;

        if (userData) {
            userData.id = undefined;
            userData.locale = undefined;
            userData.status = undefined;
        }

        const result = await api.put(`/users/${id}`, userData);

        return result.data;
    } catch (err) {
        throw err;
    }
}

export async function deleteById(userId, accessToken) {
    try {
        api.defaults.headers.common['user-token'] = accessToken;

        const result = await api.delete(`/users/${userId}`);

        return result.data;
    } catch (err) {
        throw err;
    }
}