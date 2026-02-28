import { useState, useEffect, useCallback } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import Search from "../../components/Search";
import HotelCard from "../../components/HotelCard";

import { randomGenerateDigits, getSearchFieldByName } from "../../helpers/commonHelper";
import { authKey, PerNightSearch } from "../../shared/constants";
import { usePersistedState } from "../../hooks/usePersistedState";
import { useHotel } from "../../contexts/hotels/useHotel";

import { styles } from "./styles";

export default function SearchScreen({ navigation }) {
  const buttomTabHeight =
    2 * (Math.round(useBottomTabBarHeight()?.toFixed(2) ?? 0) - 20);

  const [refreshing, setRefreshing] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [auth, setAuth] = usePersistedState(authKey, {
    user: null,
    accessToken: null,
  });

  const { hotels, getAllHandler } = useHotel();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await getAllHandler()
      .then((hotels) => {
        setHotelsData(hotels);
      })
      .catch((err) => {
        console.error('Error fetching hotels:', err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  const hotelSearchDataHandler = () => {
    return !!hotelsData &&
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

  const loadHotelHandler = (hotel) => {
    navigation.navigate('Hotel', {
      ...hotel, auth,
    });
  }

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
              reviews={randomGenerateDigits()}
              booked={false}
              kind={PerNightSearch}
              onPress={() => loadHotelHandler(item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
