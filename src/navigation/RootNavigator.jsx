import { Image, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeNavigator from "./HomeNavigator";
import SearchScreen from "../screens/Search";
import BookingScreen from "../screens/Booking";

import Authnavigator from "./AuthNavigator.jsx";
import { useAuth } from "../contexts/auth/useAuth.js";

import { ImagesAssets } from "../../assets/images";

import { styles } from "./styles";

export default function RootNavigator() {
  const Stack = createNativeStackNavigator();
  const Tabs = createBottomTabNavigator();

  const { isAuthenticated, isGuest } = useAuth();

  return isAuthenticated ? (
    <Tabs.Navigator screenOptions={{ ...styles.tabsNavigator }}>
      <Tabs.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
          title: "My booking",
          headerLeft: () => (
            <Image
              source={ImagesAssets.logo}
              style={[styles.stackHeaderLeft, { marginRight: 10 }]}
              resizeMode="contain"
            />
          ),
          headerRight: () => {
            return (
              <View style={{ paddingRight: 20 }}>
                <TouchableOpacity>
                  <Ionicons name="search" size={30} color="#9E9E9E" />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
    </Tabs.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthGate"
        component={Authnavigator}
        options={{
          headerShown: false,
          headerTitle: "",
          presentation: "modal",
          headerBackButtonDisplayMode: true,
        }}
      />
    </Stack.Navigator>
  );
}
