import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./navigation/RootNavigator";
import { HotelProvider } from "./contexts/hotels/HotelProvider";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <HotelProvider>
        <RootNavigator />
      </HotelProvider>
    </NavigationContainer>
  );
}
