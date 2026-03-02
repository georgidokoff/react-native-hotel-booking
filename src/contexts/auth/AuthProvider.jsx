import { createContext, useState, useCallback, useEffect } from "react";

import { callLogin, callRegister, callLoginGuest, callLogout } from "../../services/authService.js";
import { setLogoutCallback } from "../../services/api.js";
import { usePersistedState } from "../../hooks/usePersistedState.js";
import { authKey, Authorised, Guest } from "../../shared/constants.js";

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
    const [auth, setAuth] = usePersistedState(authKey, {
        accessToken: null,
        user: null,
    });

    useEffect(() => {
        if (!auth?.accessToken) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }

        // ensure loading state is set to false after period of time
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [auth?.accessToken === null]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Register logout callback for API interceptor
    useEffect(() => {
        setLogoutCallback(() => {
            // Clear auth on 401 error
            setAuth({
                accessToken: null,
                user: null,
            });
            setError('Your session has expired. Please login again.');
            setTimeout(() => {
                setError(null);
                logout();
            }, 1000);
        });
    }, [setAuth]);

    const login = async (login, password) => {
        try {
            setIsLoading(true);

            return await callLogin(login, password)
                .then((res) => {
                    let user = {
                        ...res,
                        id: res?.objectId,
                        locale: res?.blUserLocale,
                        status: res?.userStatus
                    }

                    const accessToken = res['user-token'];

                    setAuth({ user, accessToken });

                })
                .catch((err) => {
                    setAuth({
                        accessToken: null,
                        user: null,
                    });
                    console.error('Login error:', err);
                    setError('An error occurred during login');
                    return { valid: false, message: 'An error occurred during login' };
                });

        } catch (err) {
            // console.log('login error', err, JSON.stringify(err), err.stack);
            console.error('Login error:', err);
            setError('An error occurred during login');
            return { valid: false, message: 'An error occurred during login' };
        } finally {
            setIsLoading(false);
        }
    }

    const register = async (email, password, name) => {
        try {
            setIsLoading(true);
            const response = await callRegister(email, password, name);

            if (response?.userStatus === "ENABLED") {
               return await login(email, password);
            }

            return response;

        } catch (err) {
            setAuth({
                accessToken: null,
                user: null,
            });
            setError('An error occurred during registration');
            return { valid: false, message: 'An error occurred during registration' };
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
            setAuth({
                accessToken: null,
                user: null,
            });
            console.error('Guest login error:', err);
            setError('An error occurred during guest login');
            return { valid: false, message: 'An error occurred during guest login' };
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        await callLogout(auth?.accessToken)
            .catch((err) => {
                setIsLoading(false);
                console.error('Error during logout:', err);
                setError('An error occurred during logout');
                return { valid: false, message: 'An error occurred during logout' };
            })
            .finally(() => {
                setAuth({
                    accessToken: null,
                    user: null,
                })
                setIsLoading(false);
            });
    };

    const clearError = () => () => {
        setError(null);
        setIsLoading(false);
    };

    const contextValue = {
        isAuthenticated: !!auth.user && !!auth.accessToken && auth.user?.status === Authorised,
        isGuest: !!auth.user && !!auth.accessToken && auth.user?.status === Guest,
        isLoading,
        error,
        user: auth.user,
        auth,
        clearError,
        login,
        register,
        loginGuest,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
