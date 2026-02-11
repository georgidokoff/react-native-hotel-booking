import {
    useContext
} from "react";
import {
    UserContext
} from './UserProvider';

export function useUser() {
    const context = useContext(UserContext);
    
    return context;
}