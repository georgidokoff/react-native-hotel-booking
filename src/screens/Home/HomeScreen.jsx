import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { usePersistedState } from "../../hooks/usePersistedState";
import { useBooking } from "../../contexts/bookings/useBooking";

import FeatureCard from "../../components/FeatureCard";
import HotelCard from "../../components/HotelCard";
import Search from "../../components/Search";

import { ImagesAssets } from "../../../assets/images";
import { HotelsData } from "../../temp/data";
import { styles } from "./styles";
import { randomGenerateReviews } from "../../helpers/commonHelper";

export default function HomeScreen({ navigation }) {
  const { getByUserId } = useBooking();
  const [refreshing, setRefreshing] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [auth] = usePersistedState("auth", {
    user: null,
    accessToken: null,
  });
  const [user, setUser] = useState(auth?.user || null);
  const [bookingData, setBookingData] = useState([]);

  const categories = ["Recommended", "Popular", "Trending", "Luxury"];

  const tabBarHeight = useBottomTabBarHeight();

  const fetchingBookings = async () => {
    await getByUserId(auth.user.id, auth.accessToken)
      .then((booking) => {
        setBookingData(booking?.filter((b) => b?.state === "Ongoing"));
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
        setRefreshing(false);
      });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    if (auth?.user) {
      await fetchingBookings();
    }
  }, [auth]);

  useEffect(() => {
    setHotels(HotelsData);
  }, []);

  useEffect(() => {
    if (auth?.user) {
      setUser(auth.user);

      fetchingBookings();
    }
  }, [auth]);

  return (
    <ScrollView
      style={{ paddingBottom: tabBarHeight }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* --- Welcome Text --- for authenticate user*/}
      {user?.status === "ENABLED" && (
        <View style={[styles.sectionHeader,{justifyContent: 'flex-start', padding: 10,marginBottom: 10}]}>
          <Text style={[styles.sectionTitle,{fontSize: 28}]}>Hello, {user.name}{'  '}</Text>
          <Image source={ImagesAssets.waving_hand_light} style={{width: 40, height: 40}} />
        </View>
      )}

      {/* Search */}
      <Search />

      {/* --- Categories --- */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryBtn,
              index === 0 && styles.categoryBtnActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                index === 0 && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* --- Featured Card (Emeralda De Hotel) --- */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuredScroll}
      >
        {hotels
          .filter((h) => h.id !== 0)
          .map((hotel) => (
            <FeatureCard
              key={hotel.id}
              imageUrl={hotel.base64 ? hotel.base64 : hotel.imageUrl}
              rating={hotel.rating}
              name={hotel.name}
              city={hotel.city}
              country={hotel.country}
              price={hotel.price}
              kind="/ per night"
            />
          ))}
      </ScrollView>

      {/* --- Recently Booked Section --- */}
      {(user?.status === "ENABLED" && (
        <ScrollView>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Booked</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {bookingData &&
            bookingData.map((ongoing) => (
              <HotelCard
                key={ongoing.id}
                name={ongoing.name}
                imageUrl={ongoing.imageUrl}
                city={ongoing.city}
                country={ongoing.country}
                price={ongoing.price}
                rating="4.8"
                reviews={randomGenerateReviews()}
                booked={ongoing.state === "Ongoing"}
              />
            ))}
        </ScrollView>
      )) || (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Logined in users see their bookings
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
