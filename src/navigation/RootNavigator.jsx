import { Image, View, TouchableOpacity, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeNavigator from "./HomeNavigator";
import SearchScreen from "../screens/Search";
import BookingScreen from "../screens/Booking";
import ProfileScreen from "../screens/Profile";

import Authnavigator from "./AuthNavigator.jsx";
import { useAuth } from "../contexts/auth/useAuth.js";

import { ImagesAssets } from "../../assets/images";

import { defaultTheme } from "../helpers/styleHelper";
import { styles } from "./styles";
import SearchNavigator from "./SearchNavigator.jsx";

const DisabledTabBarButton = (props) => {
  return (
    <Pressable
      {...props}
      disabled
      onPress={() => null}
      style={[props.style, { opacity: 0.5 }]}
    />
  );
};

export default function RootNavigator() {
  const Stack = createNativeStackNavigator();
  const Tabs = createBottomTabNavigator();

  const { isAuthenticated, isGuest, logout } = useAuth();

  return isAuthenticated || isGuest ? (
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
        name="SearchTab"
        component={SearchNavigator}
        options={{
          headerTitle: "Find hotel",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: "My booking",
          tabBarButton: (props) =>
            isAuthenticated ? (
              <Pressable {...props} />
            ) : (
              <DisabledTabBarButton {...props} />
            ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
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
                  <Ionicons
                    name="search"
                    size={30}
                    color={defaultTheme.greyColor}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: isGuest ? "Guests Can only logout" : "My profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerRight: () => {
            return (
              <View style={{ paddingRight: 20 }}>
                <TouchableOpacity onPress={logout}>
                  <Ionicons
                    name="log-out-outline"
                    size={30}
                    color={defaultTheme.greyColor}
                  />
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
