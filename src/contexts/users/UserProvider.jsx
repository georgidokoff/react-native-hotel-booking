import { createContext, useState } from "react";
import { getById, update, deleteById } from "../../services/userService.js";

export const UserContext = createContext({
    isLoading: false,
    user: {},
    error: null,
    getById(userId, accessToken) { },
    updateUser(userData, accessToken) { },
    deleteUserById(userId, accessToken) { },
    clearError: () => { },
});

export function UserProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [user, setUser] = useState(null);

    const getByIdHandler = async (userId, accessToken) => {
        setIsLoading(true);

        try {
            const userData = await getById(userId, accessToken);
            setUser(userData);
        } catch (err) {
            console.error("Error fetching user by ID:", err);
            setError("An error occurred while fetching user data.");
        } finally {
            setIsLoading(false);
        }
    };

    const updateUserHandler = async (userData, accessToken) => {
        setIsLoading(true);

        try {
            const updatedUser = await update(userData, accessToken);
            setUser(updatedUser);

            return updatedUser;
        } catch (err) {
            console.error("Error updating user:", err);
            setError("An error occurred while updating user data.");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteUserByIdHandler = async (userId, accessToken) => {
        setIsLoading(true);

        try {
            await deleteById(userId, accessToken);
            setUser(null); // Clear user data after deletion
        } catch (err) {
            console.error("Error deleting user:", err);
            setError("An error occurred while deleting user data.");
        } finally {
            setIsLoading(false);
        }
    };

    const contextValue = {
        isLoading,
        user,
        error,
        getById: getByIdHandler,
        updateUser: updateUserHandler,
        deleteUserById: deleteUserByIdHandler,
        clearError: () => {
            setError(null);
            setIsLoading(false);
        }
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}