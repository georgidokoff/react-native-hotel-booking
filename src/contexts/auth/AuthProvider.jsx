import { createContext, useState } from "react";
import { callLogin, callRegister } from "../../services/authService.js";
import { usePersistedState } from "../../hooks/usePersistedState.js";

export const AuthContext = createContext({
    isLoading: false,
    isAuthenticated: false,
    isGuest: false,
    error: null,
    user: null,
    auth: null,
    login: async (email, password) => { },
    register: async (email, password, name) => { },
    clearError: () => { },
    logout: () => { },
});

export function AuthProvider({ children }) {
    const [auth, setAuth] = usePersistedState("auth", {
        accessToken: null,
        user: null,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (login, password) => {
        try {
            setIsLoading(true);
            const response = await callLogin(login, password);
            
            let user ={
                id: response?.objectId,
                email: response?.email,
                name: response?.name,
                phone: response?.phone,
                locale: response?.blUserLocale,
            }

            const accessToken = response['user-token'];
            
            setAuth({ user, accessToken });
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    }

    const register = async (email, password, name) => {
        try {
            setIsLoading(true);
            const response = await callRegister(email, password, name);

            let user = {
                id: response?.objectId,
                email: response?.email,
                name: response?.name,
                phone: response?.phone,
                locale: response?.blUserLocale,
            }
            
           const accessToken = response['user-token'];
            
           setAuth({ user, accessToken });

        } catch (err) {
            setError(err.message || 'An error occurred during registration');
        }
        finally {
            setIsLoading(false);
        }
    }
    
    const contextValue = {
        isAuthenticated: !!auth.user,
        isGuest: !auth.user && !auth.accessToken,
        isLoading,
        error,
        user: auth.user,
        auth,
        clearError: () => setError(null),
        login,
        register,
        logout: () => {
            setAuth({
                accessToken: null,
                user: null,
            });
        },
    };
    
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
