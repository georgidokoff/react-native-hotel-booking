import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./navigation/RootNavigator";
import { AuthProvider } from "./contexts/auth/AuthProvider.jsx";
import { HotelProvider } from "./contexts/hotels/HotelProvider";
import { UserProvider } from "./contexts/users/UserProvider.jsx";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <AuthProvider>
        <HotelProvider>
          <UserProvider>
            <RootNavigator />
          </UserProvider>
        </HotelProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
