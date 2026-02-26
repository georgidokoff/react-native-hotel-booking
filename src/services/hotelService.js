import { api } from "./api.js";

export async function getAll(pageSize = 100, offset = 0) {
    try {
        const result = await api.get(`/hotels?pageSize=${pageSize}&offset=${offset}`);

        return result.data;
    } catch (error) {
        console.error("Error fetching hotels:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getById(hotelId) {
    try {
    const equalSymbol = '%20%3D%20';
    const result = await api.get(`/hotels?where=id${equalSymbol}'${hotelId}'`);

    return result.data;
    } catch (error) {
        console.error("Error fetching hotel by ID:", error.response ? error.response.data : error.message);
        throw error;
    }
}