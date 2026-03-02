import { useState, useEffect, useCallback } from "react";
import { FlatList, View, RefreshControl, ActivityIndicator, Text } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import Search from "../../components/Search";
import HotelCard from "../../components/HotelCard";
import Empty from "../../common/Empty";

import { randomGenerateDigits, getSearchFieldByName } from "../../helpers/commonHelper";
import { authKey, PerNightSearch } from "../../shared/constants";
import { usePersistedState } from "../../hooks/usePersistedState";
import { useHotel } from "../../contexts/hotels/useHotel";

import { defaultTheme } from "../../helpers/styleHelper";
import { styles } from "./styles";

export default function SearchScreen({ navigation, route }) {
  const buttomTabHeight =
    2 * (Math.round(useBottomTabBarHeight()?.toFixed(2) ?? 0) - 20);

  const [errorState, setErrorState] = useState({ valid: true, message: "" });
  const [refreshing, setRefreshing] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [auth] = usePersistedState(authKey, {
    user: null,
    accessToken: null,
  });

  const { hotels, getAllHandler, isLoading, error, clearError } = useHotel();

  useEffect(() => {
    setErrorState({ valid: !error, message: error });
  }, [route.params, error]);

  const onRefresh = useCallback(async () => {
    clearError();
    setRefreshing(true);

    await getAllHandler()
      .then((hotels) => {
        setHotelsData(hotels);
      })
      .catch((err) => {
        setHotelsData([]);
        //return "Error fetching hotels.";
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  const hotelSearchDataHandler = () => {
    if (!hotelsData || hotelsData.length === 0) {
      return [];
    }

    return Array.isArray(hotelsData) ? hotelsData.filter((hotel) => hotel?.id !== 0 &&
      (
        (!searchInput || getSearchFieldByName(hotel?.name, searchInput)) ||
        (!searchInput || getSearchFieldByName(hotel?.country_code, searchInput)) ||
        (!searchInput || getSearchFieldByName(hotel?.city, searchInput)) ||
        (!searchInput || getSearchFieldByName(hotel?.kind, searchInput)) ||
        (!searchInput || getSearchFieldByName(hotel?.occupancy, searchInput))
      )) : [];
  }

  useEffect(() => {
    setHotelsData(hotels);
  }, [hotels]);

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

      {errorState && !errorState.valid && (
        <Text style={styles.errorText}>{errorState.message}</Text>
      )}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={defaultTheme.primaryColor} />
        </View>
      ) : (
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
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <Empty message="No hotels found." />
            }
          />
        </View>)}
    </View>
  );
}
