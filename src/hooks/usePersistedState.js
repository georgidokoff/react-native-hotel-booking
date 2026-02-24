import {
    useState,
    useEffect
} from 'react';

import * as SecureStore from 'expo-secure-store';

export function usePersistedState(key, initialValue) {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        const loadState = async () => {
            try {
                const storedValue = await SecureStore.getItemAsync(key);
                if (!storedValue) {
                    return;
                }

                setState(JSON.parse(storedValue));
            } catch (err) {
                console.error("Failed to load persisted state:", err);
            }
        };

        loadState();
    }, [key]);

    const setPersistedState = async (value) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;

            setState(valueToStore);

            await SecureStore.setItemAsync(key, JSON.stringify(valueToStore));
        } catch (err) {
            console.error("Failed to save persisted state:", err);
        }
    };

    return [state, setPersistedState];
}