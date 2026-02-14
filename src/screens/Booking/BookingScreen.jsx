import { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import BookingCard from "../../components/BookingCard";

import { useBooking } from "../../contexts/bookings/useBooking.js";
import { usePersistedState } from "../../hooks/usePersistedState.js";
import { tabs } from "../../helpers/commonHelper.js";

import { styles } from "./styles";

export default function BookingScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [auth] = usePersistedState("auth", null);
  const { getByUserId, update } = useBooking();

  const [activeTab, setActiveTab] = useState("Ongoing");
  const [bookingsData, setBookingsData] = useState([]);

  const fetchBookings = async () => {
    if (auth && auth.user.id && auth.accessToken) {
      await getByUserId(auth.user.id, auth.accessToken)
        .then((bookings) => {
          setBookingsData(bookings);
          setRefreshing(false);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
        });
    }
  };

  useMemo(() => {
    fetchBookings();
  }, [auth]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    if (auth?.user) {
      await fetchBookings();
    }
  }, [auth]);

  const tabPressHandler = (tab) => {
    setActiveTab(tab);
  };

  const cancelBookingCardHandler = async (id) => {
    let canceledBooking = bookingsData.find((od) => od.id === id);
    canceledBooking.state = "Canceled";
    canceledBooking.tag = "Canceled & Refunded";

    await update(canceledBooking, auth.accessToken);

    setBookingsData([
      ...bookingsData.filter((od) => od.id !== canceledBooking.id),
      canceledBooking,
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => tabPressHandler(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={
          bookingsData && bookingsData.filter((od) => od.state === activeTab)
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookingCard
            item={item}
            status={activeTab}
            onCancelBookingCard={cancelBookingCardHandler}
          />
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}
