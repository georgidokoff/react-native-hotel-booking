import { createContext, useState, useContext } from "react";
import {
    getByUserId,
    create,
    update,
    deleteById,
} from "../../services/bookingService.js";
import { useAuth } from "../auth/useAuth.js";
import { usePersistedState } from "../../hooks/usePersistedState.js";
import { authKey } from "../../shared/constants.js";

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
    const [auth, setAuth] = usePersistedState(authKey, {
        accessToken: null,
        user: null,
    });
    const { logout } = useAuth();

    const getByUserIdHandler = async (userId, accessToken) => {
        try {
            setIsLoading(true);
            setError(null);

            const bookingsData = await getByUserId(userId, accessToken);

            setBookings(bookingsData || []);

            return bookingsData || []
        } catch (err) {
            // Handle auth errors (401, token invalid)
            if (err.isAuthError) {
                setError("Your session has expired. Please login again.");
                clearError();
                // setBookings([]);
                setAuth({
                    accessToken: null,
                    user: null,
                });
                logout();
                console.error("Auth error detected, user will be logged out by API interceptor.");
                return [];
            }

            setError("An error occurred while fetching bookings.");
            setBookings([]);
            console.error("Error fetching bookings:", err);
            return [];
        }
        finally {
            setIsLoading(false);
        }
    };

    const createHandler = async (bookingData, accessToken) => {
        try {
            setIsLoading(true);
            setError(null);
            const newbooking = await create(bookingData, accessToken);

            setBookings((prevbookings) => [...prevbookings, newbooking]);

            return newbooking;
        } catch (err) {
            if (err.isAuthError) {
                clearError();
                // setBookings([]);
                setAuth({
                    accessToken: null,
                    user: null,
                });
                logout();
                setError("Your session has expired. Please login again.");
                console.error("Auth error detected, user will be logged out by API interceptor.");
                setauth
                return {};
            }

            setError("An error occurred while creating the booking.");
            console.error("Error creating booking:", err);
            return null;
        }
        finally {
            setIsLoading(false);
        }
    };

    const updateHandler = async (bookingData, accessToken) => {
        try {
            setIsLoading(true);
            setError(null);
            const updatedbooking = await update(bookingData, accessToken);

            setBookings((prevbookings) =>
                prevbookings.map((booking) =>
                    booking.id === updatedbooking.id ? updatedbooking : booking,
                ),
            );

            return updatedbooking;
        } catch (err) {
            if (err.isAuthError) {
                clearError();
                // setBookings([]);
                setAuth({
                    accessToken: null,
                    user: null,
                });
                logout();
                setError("Your session has expired. Please login again.");
                console.error("Auth error detected, user will be logged out by API interceptor.");
                return {};
            }

            setError("An error occurred while updating the booking.");
            console.error("Error updating booking:", err);
            return null;
        }
        finally {
            setIsLoading(false);
        }
    };

    const removeHandler = async (bookingId, accessToken) => {
        try {
            setIsLoading(true);
            setError(null);
            await deleteById(bookingId, accessToken);
            setBookings((prevbookings) =>
                prevbookings.filter((booking) => (booking.objectId ?? booking.id) !== bookingId),
            );
            return true;
        } catch (err) {
            if (err.isAuthError) {
                clearError();
                // setBookings([]);
                setAuth({
                    accessToken: null,
                    user: null,
                });
                logout();
                setError("Your session has expired. Please login again.");
                console.error("Auth error detected, user will be logged out by API interceptor.");
                return false;
            }

            setError("An error occurred while removing the booking.");
            console.error("Error removing booking:", err);
            return false;
        }
        finally {
            setIsLoading(false);
        }
    };

    const clearError = () => () => {
        setError(null);
        setIsLoading(false);
    };

    const contextValue = {
        isLoading,
        bookings,
        error,
        create: createHandler,
        update: updateHandler,
        getByUserId: getByUserIdHandler,
        remove: removeHandler,
        clearError,
    };

    return (
        <BookingContext.Provider value={contextValue}>
            {children}
        </BookingContext.Provider>
    );
}
