import { createContext, useState } from "react";
import { getById, update, deleteById } from "../../services/userService.js";

export const UserContext = createContext({
  user: {},
  getById(userId, accessToken) {},
  updateUser(userData, accessToken) {},
  deleteUserById(userId, accessToken) {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

    const getByIdHandler = async (userId, accessToken) => {
        try {
            const userData = await getById(userId, accessToken);
            setUser(userData);
        } catch (err) {
            console.error("Error fetching user by ID:", err);
        }
    };

    const updateUserHandler = async (userData, accessToken) => {
        try {
            const updatedUser = await update(userData, accessToken);
            setUser(updatedUser);
            
            return updatedUser;
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    const deleteUserByIdHandler = async (userId, accessToken) => {
        try {
            await deleteById(userId, accessToken);
            setUser(null); // Clear user data after deletion
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    const contextValue = {
        user,
        getById: getByIdHandler,
        updateUser: updateUserHandler,
        deleteUserById: deleteUserByIdHandler,
    };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}