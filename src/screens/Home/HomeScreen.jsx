import { View, TextInput, TouchableOpacity, Text, Image, FlatList, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Header from "../../components/Header";
import HotelListItem from "../../components/HotelCard";
import FeatureCard from "../../components/FeatureCard";

import { ImagesAssets } from '../../../assets/images';

import { styles } from "./styles";
import HotelCard from "../../components/HotelCard";

export default function HomeScreen({ navigation }) {

  const categories = ['Recommended', 'Popular', 'Trending', 'Luxury'];

  const Item = ({ title }) => (
    <View style={styles.itemView}>
      <Text style={styles.itemTitle}>{title}</Text>
    </View>
  );

  return (
    <ScrollView>
      {/* --- Welcome Text --- for authenticate user*/}
      {/* <Text>Welcome</Text> */}

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9E9E9E" />
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Ionicons name="options-outline" size={20} color="#1AB65C" />
      </View>

      {/* --- Categories --- */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.categoryBtn, index === 0 && styles.categoryBtnActive]}
          >
            <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* --- Featured Card (Emeralda De Hotel) --- */}
      <FeatureCard
        imageUrl='https://images.unsplash.com/photo-1566073771259-6a8506099945'
        rating="4.8"
        name="Emeralda De Hotel"
        city="Paris"
        country="France"
        price="$29"
        kind="/ per night"
      />

      {/* --- Recently Booked Section --- */}
      <ScrollView>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Booked</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
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
    </ScrollView>
  );
}
