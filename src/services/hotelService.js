import { api } from "./api.js";

export async function getAll() {
    const result = await api.get('/hotels');

    return result.data;
}

export async function getById(hotelId) {
    const equalSymbol = '%3D'
    const result = await api.get(`/hotels?where=id${equalSymbol}${hotelId}`);

    return result.data;
}