import { View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import BookingScreen from "../screens/Booking";
import HotelScreen from "../screens/Hotel/HotelScreen";
import BookingDateScreen from "../screens/BookingDate";

import { ImagesAssets } from "../../assets/images";

import { styles } from "./styles";

export default function SearchNavigator({ }) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Search"
                component={SearchScreen}
            />

            <Stack.Screen name="Hotel"
                component={HotelScreen}
                options={{ headerTitle: 'Hotel Details' }}
            />

            <Stack.Screen
                name="BookingDate"
                component={BookingDateScreen}
                options={{ headerTitle: 'Select Date' }}
            />
        </Stack.Navigator>
    )
}