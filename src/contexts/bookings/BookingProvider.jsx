import { createContext, useState } from "react";
import {
    getByUserId,
    create,
    update,
    deleteById,
} from "../../services/bookingService.js";
import { useAuth } from "../auth/useAuth.js";

export const BookingContext = createContext({
    isLoading: false,
    bookings: [],
    error: null,
    async create(bookingData, accessToken) { },
    async getByUserId(userId, accessToken) { },
    async update(bookingData, accessToken) { },
    async remove(bookingId, accessToken) { },
    clearError: () => { },
});

export function BookingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);
    const { refreshToken } = useAuth();

    const getByUserIdHandler = async (userId, accessToken) => {
        try {
            setIsLoading(true);

            const bookingsData = await getByUserId(userId, accessToken);

            setBookings(bookingsData);

            return bookingsData
        } catch (err) {
            setError("An error occurred while fetching bookings.");
            // Check if token expired
            if (err.tokenExpired && refreshToken) {
                const newToken = await refreshToken();

                if (newToken) {
                    setError(null);
                    // Retry with new token
                    try {
                        const bookingsData = await getByUserId(userId, newToken);
                        setBookings(bookingsData);
                        return bookingsData;
                    } catch (retryErr) {
                        console.error("Error fetching bookings after token refresh:", retryErr);
                        setError("An error occurred while fetching bookings after token refresh.");
                        return { valid: false, message: "An error occurred while fetching bookings after token refresh." };
                    }
                }
            } else {
                console.error("Error fetching bookings by user ID:", err);
                setError("An error occurred while fetching bookings.");
                return { valid: false, message: "An error occurred while fetching bookings." };
            }
            return "An error accured while fetching bookings.";
        }
        finally {
            setIsLoading(false);
        }
    };

    const createHandler = async (bookingData, accessToken) => {
        try {
            setIsLoading(true);
            const newbooking = await create(bookingData, accessToken);

            setBookings((prevbookings) => [...prevbookings, newbooking]);

            return newbooking;
        } catch (err) {
            setError("An error occurred while creating the booking.");
            if (err.tokenExpired && refreshToken) {
                const newToken = await refreshToken();

                if (newToken) {
                    setError(null);
                    try {
                        const newbooking = await create(bookingData, newToken);
                        setBookings((prevbookings) => [...prevbookings, newbooking]);
                        return newbooking;
                    } catch (retryErr) {
                        console.error("Error creating booking after token refresh:", retryErr);
                        setError("An error occurred while creating the booking after token refresh.");
                        return { valid: false, message: "An error occurred while creating the booking after token refresh." };
                    }
                }
            } else {
                console.error("Error creating booking:", err);
                setError("An error occurred while creating the booking.");
                return { valid: false, message: "An error occurred while creating the booking." };
            }
        }
        finally {
            setIsLoading(false);
        }
    };

    const updateHandler = async (bookingData, accessToken) => {
        try {
            setIsLoading(true);
            const updatedbooking = await update(bookingData, accessToken);

            setBookings((prevbookings) =>
                prevbookings.map((booking) =>
                    booking.id === updatedbooking.id ? updatedbooking : booking,
                ),
            );

            return updatedbooking;
        } catch (err) {
            setError("An error occurred while updating the booking.");
            if (err.tokenExpired && refreshToken) {
                const newToken = await refreshToken();

                if (newToken) {
                    setError(null);
                    try {
                        const updatedbooking = await update(bookingData, newToken);
                        setBookings((prevbookings) =>
                            prevbookings.map((booking) =>
                                booking.id === updatedbooking.id ? updatedbooking : booking,
                            ),
                        );
                        return updatedbooking;
                    } catch (retryErr) {
                        setError("An error occurred while updating the booking after token refresh.");
                        console.error("Error updating booking after token refresh:", retryErr);
                        return { valid: false, message: "An error occurred while updating the booking after token refresh." };
                    }
                }
            } else {
                console.error("Error updating booking:", err);
                setError("An error occurred while updating the booking.");
                return { valid: false, message: "An error occurred while updating the booking." };
            }
        }
        finally {
            setIsLoading(false);
        }
    };

    const removeHandler = async (bookingId, accessToken) => {
        try {
            setIsLoading(true);
            await deleteById(bookingId, accessToken);
            setBookings((prevbookings) =>
                prevbookings.filter((booking) => (booking.objectId ?? booking.id) !== bookingId),
            );
        } catch (err) {
            setError("An error occurred while removing the booking.");
            if (err.tokenExpired && refreshToken) {
                const newToken = await refreshToken();

                if (newToken) {
                    setError(null);
                    try {
                        await deleteById(bookingId, newToken);
                        setBookings((prevbookings) =>
                            prevbookings.filter((booking) => (booking.objectId ?? booking.id) !== bookingId),
                        );
                    } catch (retryErr) {
                        setError("An error occurred while removing the booking after token refresh.");
                        console.error("Error removing booking after token refresh:", retryErr);
                        return { valid: false, message: "An error occurred while removing the booking after token refresh." };
                    }
                }
            } else {
                console.error("Error removing booking:", err);
                setError("An error occurred while removing the booking.");
                return { valid: false, message: "An error occurred while removing the booking." };
            }
        }
        finally {
            setIsLoading(false);
        }
    };

    const contextValue = {
        isLoading,
        bookings,
        error,
        create: createHandler,
        update: updateHandler,
        getByUserId: getByUserIdHandler,
        remove: removeHandler,
        clearError: () => {
            setError(null);
            setIsLoading(false);
        },
    };

    return (
        <BookingContext.Provider value={contextValue}>
            {children}
        </BookingContext.Provider>
    );
}
