import { createContext, use, useEffect, useState } from "react";
import {
  getByUserId,
  create,
  update,
  deleteById,
} from "../../services/bookingService.js";

export const BookingContext = createContext({
  bookings: [],
  create(bookingData, accessToken) {},
  getByUserId(userId, accessToken) {},
  update(bookingData, accessToken) {},
  remove(bookingId, accessToken) {},
});

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  const getByUserIdHandler = async (userId, accessToken) => {
    try {
      const bookingsData = await getByUserId(userId, accessToken);

      setBookings(bookingsData);

      return bookingsData
    } catch (err) {
      console.error("Error fetching bookings by user ID:", err);
    }
  };

  const createHandler = async (bookingData, userId, accessToken) => {
    try {
      const newbooking = await create(bookingData, userId, accessToken);

      setBookings((prevbookings) => [...prevbookings, newbooking]);

      return newbooking;
    } catch (err) {
      console.error("Error creating booking:", err);
    }
  };

  const updateHandler = async (bookingData, accessToken) => {
    try {
      const updatedbooking = await update(bookingData, accessToken);

      setBookings((prevbookings) =>
        prevbookings.map((booking) =>
          booking.id === updatedbooking.id ? updatedbooking : booking,
        ),
      );

      return updatedbooking;
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  const removeHandler = async (bookingId, accessToken) => {
    try {
      await deleteById(bookingId, accessToken);
      setBookings((prevbookings) =>
        prevbookings.filter((booking) => booking.id !== bookingId),
      );
    } catch (err) {
      console.error("Error removing booking:", err);
    }
  };

  const contextValue = {
    bookings,
    create: createHandler,
    update: updateHandler,
    getByUserId: getByUserIdHandler,
    remove: removeHandler,
  };

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
}
