import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { usePersistedState } from "../../hooks/usePersistedState";

import Header from "../../components/Header";
import FeatureCard from "../../components/FeatureCard";
import HotelCard from "../../components/HotelCard";
import Search from "../../components/Search";

import { ImagesAssets } from "../../../assets/images";

import { HotelsData } from "../../temp/data";
import { styles } from "./styles";

export default function HomeScreen({ navigation }) {
  const [hotels, setHotels] = useState([]);
   const [auth, setAuth] = usePersistedState("auth", {
      user: null,
      accessToken: null,
    });
    const [user, setUser] = useState(auth?.user || null);

  const categories = ["Recommended", "Popular", "Trending", "Luxury"];

  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    setHotels(HotelsData);
  }, []);

   useEffect(() => {
    if (auth?.user) {
      setUser(auth.user);
    }
  }, [auth]);
  
  return (
    <ScrollView style={{ paddingBottom: tabBarHeight }}>
      {/* --- Welcome Text --- for authenticate user*/}
      {/* <Text>Welcome</Text> */}

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
      {(user?.status ==="ENABLED" && (
        <ScrollView>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Booked</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <HotelCard
            name="President Hotel"
            imageUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            city="Paris"
            country="France"
            price="35"
            rating="4.8"
            reviews="4,378"
            booked={true}
          />
          <HotelCard
            name="Palms Casino"
            imageUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            city="Amsterdam"
            country="Netherlands"
            price="29"
            rating="4.9"
            reviews="5,283"
          />
        </ScrollView>
      )) || (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Logined in users see their bookings</Text>
        </View>
      )}
    </ScrollView>
  );
}
