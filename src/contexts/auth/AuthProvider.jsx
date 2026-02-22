import { createContext, useState } from "react";
import { callLogin, callRegister, callLoginGuest, callLogout } from "../../services/authService.js";
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
    loginGuest: async () => { },
    logout: async () => { },
    clearError: () => { },
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

            let user = {
                id: response?.objectId,
                email: response?.email,
                name: response?.name,
                phone: response?.phone,
                locale: response?.blUserLocale,
                status: response?.userStatus,
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

            if (response?.userStatus === "ENABLED") {
                await login(email, password);
            }

        } catch (err) {
            setError(err.message || 'An error occurred during registration');
        }
        finally {
            setIsLoading(false);
        }
    }

    const loginGuest = async () => {
        try {
            setIsLoading(true);

            const response = await callLoginGuest();
            let user = {
                id: response?.objectId,
                email: 'guest@example.com',
                name: 'Guest User',
                phone: '+359812345678',
                status: response?.userStatus,
            }
            const accessToken = response['user-token'];
            setAuth({ user, accessToken });

        } catch (err) {
            setError(err.message || 'An error occurred during guest login');
        } finally {
            setIsLoading(false);
        }
    }

    const contextValue = {
        isAuthenticated: !!auth.user && !!auth.accessToken && auth.user?.status === 'ENABLED',
        isGuest: !!auth.user && !!auth.accessToken && auth.user?.status === 'GUEST',
        isLoading,
        error,
        user: auth.user,
        auth,
        clearError: () => setError(null),
        login,
        register,
        loginGuest,
        logout: async () => {
            await callLogout(auth?.accessToken)
                .catch((err) => console.log(err))
                .finally(() => {
                    setAuth({
                        accessToken: null,
                        user: null,
                    })
                });
        },
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
