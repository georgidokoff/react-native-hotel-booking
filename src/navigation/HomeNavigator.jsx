import { View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import BookingScreen from "../screens/Booking";
import HotelScreen from "../screens/Hotel/HotelScreen";
import BookingDateScreen from "../screens/BookingDate";

import { ImagesAssets } from "../../assets/images";

import { styles } from "./styles";

export default function HomeNavigator({ }) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStatusBarHeight: 0,
                headerStyle: {
                    height: 100,
                },
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={HomeScreen}
                options={{
                    headerTitle: 'Hotel booking',
                    headerLeft: () => (
                        <View style={styles.nestedNavigatorView}>
                            <Image
                                source={ImagesAssets.logo}
                                style={styles.stackHeaderLeft}
                                resizeMode="contain"
                            />
                        </View>
                    ),
                }}
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

            <Stack.Screen name="Search" component={SearchScreen} />

            <Stack.Screen name="Booking" component={BookingScreen} />
        </Stack.Navigator>
    );
}
