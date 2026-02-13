import { createContext, useEffect, useState } from "react";
import { getAll, getById } from "../../services/hotelService.js";

export const HotelContext = createContext({
  hotels: [],
  getHotelById(hotelId) {},
});

export function HotelProvider({ children }) {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function getAllHandler() {
      try {
        const result = await getAll();
        setHotels(result);
      } catch (err) {
        console.log(err);
      }
    }

    getAllHandler();
  }, []);

  const getHotelById = (hotelId) => {
    return getById(hotelId);
  };

  const contextValue = {
    hotels,
    getHotelById,
  };

  return (
    <HotelContext.Provider value={contextValue}>
      {children}
    </HotelContext.Provider>
  );
}
