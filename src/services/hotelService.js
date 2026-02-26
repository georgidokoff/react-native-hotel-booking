import { api } from "./api.js";

export async function getAll(pageSize = 100, offset = 0) {
    const result = await api.get(`/hotels?pageSize=${pageSize}&offset=${offset}`);

    return result.data;
}

export async function getById(hotelId) {
    const equalSymbol = '%20%3D%20';
    const result = await api.get(`/hotels?where=id${equalSymbol}'${hotelId}'`);

    return result.data;
}