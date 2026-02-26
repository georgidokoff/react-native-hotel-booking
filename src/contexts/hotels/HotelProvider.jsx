import { createContext, useEffect, useState } from "react";
import { getAll, getById } from "../../services/hotelService.js";

export const HotelContext = createContext({
    isLoading: false,
    hotels: [],
    error: null,
    getAllHandler() { },
    getHotelById(hotelId) { },
    clearError: () => { },
});

export function HotelProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        (async () => {
            await getAllHandler();
        })();
    }, []);

    const getAllHandler = async () => {
        try {
            setIsLoading(true);

            const result = await getAll();
            setHotels(result);
            return result;
        } catch (err) {
            console.error("Error fetching hotels:", err);
            setError("An error occurred while fetching hotels.");
            return { valid: false, message: "An error occurred while fetching hotels." };
        } finally {
            setIsLoading(false);
        }
    };

    const getHotelById = async (hotelId) => {
        try {
            setIsLoading(true);
            const hotel = await getById(hotelId);

            return hotel;
            
        } catch (error) {
            console.error("Error fetching hotel by ID:", error);
            setError("An error occurred while fetching hotel data.");
            return { valid: false, message: "An error occurred while fetching hotel data." };
        } finally {
            setIsLoading(false);
        }
    };

    const contextValue = {
        isLoading,
        error,
        hotels,
        getAllHandler,
        getHotelById,
        clearError: () => () => {
            setError(null);
            setIsLoading(false);
        },
    };

    return (
        <HotelContext.Provider value={contextValue}>
            {children}
        </HotelContext.Provider>
    );
}
