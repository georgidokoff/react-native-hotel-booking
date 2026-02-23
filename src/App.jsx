import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';

import RootNavigator from "./navigation/RootNavigator";
import { AuthProvider } from "./contexts/auth/AuthProvider.jsx";
import { HotelProvider } from "./contexts/hotels/HotelProvider";
import { UserProvider } from "./contexts/users/UserProvider.jsx";
import { BookingProvider } from "./contexts/bookings/BookingProvider.jsx";

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={{ flex: 1}}>

        <NavigationContainer>
          <StatusBar style="auto" />

          <AuthProvider>
            <HotelProvider>
              <UserProvider>
                <BookingProvider>
                  <RootNavigator />
                </BookingProvider>
              </UserProvider>
            </HotelProvider>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
