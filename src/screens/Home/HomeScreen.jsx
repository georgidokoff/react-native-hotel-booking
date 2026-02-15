import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { categories, randomGenerateReviews } from "../../helpers/commonHelper";
import { authKey, Ongoing, Recommended, Authorised, PerNight } from "../../shared/constants";
import { usePersistedState } from "../../hooks/usePersistedState";
import { useBooking } from "../../contexts/bookings/useBooking";
import { useHotel } from "../../contexts/hotels/useHotel";

import HotelCard from "../../components/HotelCard";
import Search from "../../components/Search";
import { Tab } from "../../common/Tab";

import { ImagesAssets } from "../../../assets/images";
import { styles } from "./styles";

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState(Recommended);
  const [refreshing, setRefreshing] = useState(false);
  const { getByUserId } = useBooking();
  const { hotels } = useHotel();
  const [hotelsData, setHotelsData] = useState(hotels || []);
  const [auth] = usePersistedState(authKey, {
    user: null,
    accessToken: null,
  });
  const [user, setUser] = useState(auth?.user || null);
  const [bookingsData, setBookingsData] = useState([]);

  const tabBarHeight = useBottomTabBarHeight();

  const fetchingBookings = async () => {
    await getByUserId(auth.user.id, auth.accessToken)
      .then((booking) => {
        setBookingsData(booking?.filter((b) => b?.state === Ongoing));
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

    if (hotels?.length > 0) {
      setHotelsData(hotels);
    }
  }, [auth]);

  useMemo(() => {
    setHotelsData(hotels);
  }, [hotels]);

  useEffect(() => {
    if (auth?.user) {
      setUser(auth.user);

      fetchingBookings();
    }
  }, [auth]);

  const tabPressHandler = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ScrollView
      style={{ paddingBottom: tabBarHeight }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* --- Welcome Text --- for authenticate user*/}
      {user?.status === Authorised && (
        <View style={[styles.sectionHeader, { justifyContent: 'flex-start', padding: 10, marginBottom: 10 }]}>
          <Text style={[styles.sectionTitle, { fontSize: 28 }]}>Hello, {user.name}{'  '}</Text>
          <Image source={ImagesAssets.waving_hand_light} style={{ width: 40, height: 40 }} />
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
          <Tab
            key={cat}
            style={{ ...styles }}
            activeTab={activeTab}
            tabPressHandler={tabPressHandler}
            tab={cat}
          />
        ))}
      </ScrollView>

      {/* --- Featured Card (Emeralda De Hotel) --- */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuredScroll}
      >
        {hotelsData
          .filter((h) => h.id !== 0)
          .map((hotel) => (
            <HotelCard
              key={hotel.id}
              imageUrl={hotel.image_url}
              rating={hotel.ratings}
              name={hotel.name}
              city={hotel.city}
              country={hotel.country_code}
              price={hotel.price_per_night}
              kind={PerNight}
              feature={true}
              onPress={() => { alert(`load hotel ${hotel.id}`) }}
            />
          ))}
      </ScrollView>

      {/* --- Recently Booked Section --- */}
      {(user?.status === Authorised && (
        <ScrollView>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Booked</Text>
            <TouchableOpacity onPress={() => { alert('load all') }}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {bookingsData &&
            bookingsData.map((ongoing) => (
              <HotelCard
                key={ongoing.id}
                name={ongoing.name}
                imageUrl={ongoing.imageUrl}
                city={ongoing.city}
                country={ongoing.country}
                price={ongoing.price}
                rating="4.8"
                reviews={randomGenerateReviews()}
                booked={ongoing.state === Ongoing}
                onPress={() => { alert('open hotel') }}
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
