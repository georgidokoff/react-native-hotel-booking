import { api } from "./api.js";

export async function getByUserId(userId, accessToken, pageSize = null, offset = null) {
    const equalSymbol = '%20%3D%20';
    api.defaults.headers.common['user-token'] = accessToken;
    try {
        const result = await api.get(`/bookings?where=userId${equalSymbol}'${userId}'&sortBy=created%20desc&pageSize=${pageSize ?? 100}&offset=${offset ?? 0}`);
        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function create(bookingData, accessToken) {
    api.defaults.headers.common['user-token'] = accessToken;

    try {
        const result = await api.post('/bookings', bookingData);
        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function update(bookingData, accessToken) {
    api.defaults.headers.common['user-token'] = accessToken;

    const result = await api.put(`/bookings/${bookingData.objectId}`, { ...bookingData });

    return result.data;
}

export async function deleteById(bookingId, accessToken) {
    api.defaults.headers.common['user-token'] = accessToken;
    
    const result = await api.delete(`/bookings/${bookingId}`);
    
    return result.data;
}