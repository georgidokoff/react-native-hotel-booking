import { useState, useEffect, useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import Search from "../../components/Search";
import HotelCard from "../../components/HotelCard";

import { useHotel } from "../../contexts/hotels/useHotel";
import { randomGenerateReviews } from "../../helpers/commonHelper";

import { styles } from "./styles";

export default function SearchScreen() {
  const buttomTabHeight =
    2 * (Math.round(useBottomTabBarHeight()?.toFixed(2) ?? 0) + 3);

  const { hotels } = useHotel();

  return (
    <View>
      <Search />

      <View style={[{ ...styles }, { marginBottom: buttomTabHeight }]}>
        <FlatList
          data={hotels.filter((h) => h.id !== 0)}
          renderItem={({ item }) => (
            <HotelCard
              name={item.name}
              imageUrl={item.base64 ? item.base64 : item.image_url}
              city={item.city}
              country={item.country}
              price={item.price_per_night}
              rating={item.ratings}
              reviews={randomGenerateReviews()}
              booked={false}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
