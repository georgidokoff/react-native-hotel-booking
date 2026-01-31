import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeNavigator from "./HomeNavigator";
import SearchScreen from "../screens/Search";
import BookingScreen from "../screens/Booking";
import { styles } from "./styles";

export default function RootNavigator() {
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarStyle: styles.bottomTab,
                tabBarActiveTintColor: styles.tabLabelActive.color,
                tabBarInactiveTintColor: styles.tabLabel.color,
                tabBarLabelStyle: {
                    fontSize: styles.tabLabel.fontSize,
                    marginTop: styles.tabLabel.marginTop,
                },
            }}         
        >
            <Tabs.Screen
                name="HomeTab"
                component={HomeNavigator}
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                    headerShown: false
                }}
            />

            <Tabs.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
                }}
            />

            <Tabs.Screen
                name="Booking"
                component={BookingScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
                }}
            />
        </Tabs.Navigator>
    )
}