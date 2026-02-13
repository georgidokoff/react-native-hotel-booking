import { api } from "./api.js";

export async function getByUserId(userId, accessToken) {
    const equalSymbol = '%20%3D%20';
    api.defaults.headers.common['user-token'] = accessToken;

    const result = await api.get(`/bookings?where=userId${equalSymbol}'${userId}'`);
    return result.data;
}

export async function create(bookingData,userId, accessToken) {
    api.defaults.headers.common['user-token'] = accessToken;

    const result = await api.post('/bookings', { ...bookingData, userId });

    return result.data;
}

export async function update(bookingData, accessToken) {
    api.defaults.headers.common['user-token'] = accessToken;

    const result = await api.put(`/bookings/${bookingData.objectId}`, { ...bookingData });

    return result.data;
}

export async function deleteById(bookingId, accessToken) {
    api.defaults.headers.common['user-token'] = accessToken;

    await api.delete(`/bookings/${bookingId}`);
}