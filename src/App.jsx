import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./navigation/RootNavigator";
import { AuthProvider } from "./contexts/auth/AuthProvider.jsx";
import { HotelProvider } from "./contexts/hotels/HotelProvider";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <AuthProvider>
        <HotelProvider>
          <RootNavigator />
        </HotelProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
