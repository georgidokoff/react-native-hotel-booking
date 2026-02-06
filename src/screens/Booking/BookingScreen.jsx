import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";

import BookingCard from "../../components/BookingCard";

import { OrdersData } from "../../temp/data";

import { styles } from "./styles";

export default function BookingScreen() {
  const [activeTab, setActiveTab] = useState("Ongoing");
  const [ordersData, setOrdersData] = useState(OrdersData || []);

  const tabs = ["Ongoing", "Completed", "Canceled"];

  const tabPressHandler = (tab) => {
    setActiveTab(tab);
  };
  const cancelBookingCardHandler = (id) => {
    let canceledBooking = ordersData.find((od) => od.id === id);
    canceledBooking.state = "Canceled";
    canceledBooking.tag = "Canceled & Refunded";
    
    setOrdersData([
      ...ordersData.filter((od) => od.id !== canceledBooking.id),
      canceledBooking,
    ]);
    
  };
  return (
    <View style={styles.container}>
      {/* Tabs */}
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

      {/* List */}
      <FlatList
        data={ordersData.filter((od) => od.state === activeTab)}
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
