import { useContext } from "react";
import { HotelContext } from  './HotelProvider';

export function useHotel() {
  const context = useContext(HotelContext);

  return context;
}