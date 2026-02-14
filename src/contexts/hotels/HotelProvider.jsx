import { createContext, useEffect, useState } from "react";
import { getAll, getById } from "../../services/hotelService.js";

export const HotelContext = createContext({
  hotels: [],
  getAllHandler() {},
  getHotelById(hotelId) {},
});

export function HotelProvider({ children }) {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getAllHandler();
  }, []);

  const getAllHandler = async () => {
    try {
      const result = await getAll();
      setHotels(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const getHotelById = (hotelId) => {
    return getById(hotelId);
  };

  const contextValue = {
    hotels,
    getAllHandler,
    getHotelById,
  };

  return (
    <HotelContext.Provider value={contextValue}>
      {children}
    </HotelContext.Provider>
  );
}
