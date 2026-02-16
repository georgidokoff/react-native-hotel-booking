import { useState, useEffect, useCallback } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import Search from "../../components/Search";
import HotelCard from "../../components/HotelCard";

import { randomGenerateReviews, getSearchFieldByName } from "../../helpers/commonHelper";
import { PerNightSearch } from "../../shared/constants";
import { useHotel } from "../../contexts/hotels/useHotel";

import { styles } from "./styles";

export default function SearchScreen() {
  const buttomTabHeight =
    2 * (Math.round(useBottomTabBarHeight()?.toFixed(2) ?? 0) - 20);

  const [refreshing, setRefreshing] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const { hotels, getAllHandler } = useHotel();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await getAllHandler()
      .then((hotels) => {
        setHotelsData(hotels);

        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const hotelSearchDataHandler = () => {
    return hotelsData &&
      hotelsData
        .filter((hotel) => hotel.id !== 0 &&
          (
            (!searchInput || getSearchFieldByName(hotel?.name, searchInput)) ||
            (!searchInput || getSearchFieldByName(hotel?.country_code, searchInput)) ||
            (!searchInput || getSearchFieldByName(hotel?.city, searchInput)) ||
            (!searchInput || getSearchFieldByName(hotel?.kind, searchInput)) ||
            (!searchInput || getSearchFieldByName(hotel?.occupancy, searchInput))
          ));
  }

  useEffect(() => {
    setHotelsData(hotels);
  }, []);
  console.log(searchInput)
  return (
    <View>
      <Search
        input={searchInput}
        setInput={setSearchInput}
      />

      <View style={[{ ...styles }, { marginBottom: buttomTabHeight }]}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={hotelSearchDataHandler()}
          renderItem={({ item }) => (
            <HotelCard
              name={item.name}
              imageUrl={item.base64 ? item.base64 : item.image_url}
              city={item.city}
              country={item.country_code}
              price={item.price_per_night}
              rating={item.ratings}
              reviews={randomGenerateReviews()}
              booked={false}
              kind={PerNightSearch}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
