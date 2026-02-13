import { useContext } from "react";

import { BookingContext } from "./BookingProvider";

export function useBooking() {
    const context = useContext(BookingContext);
    
    return context;
};