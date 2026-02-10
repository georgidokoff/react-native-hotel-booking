import {
    useState,
    useEffect
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function usePersistedState(key, initialValue) {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        const loadState = async () => {
            try {
                const storedValue = await AsyncStorage.getItem(key);
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

            await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
            console.error("Failed to save persisted state:", err);
        }
    };

    return [state, setPersistedState];
}