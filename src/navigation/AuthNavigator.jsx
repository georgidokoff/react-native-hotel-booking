import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthGateScreen from "../screens/Auth/AuthGateScreen.jsx";
import LoginScreen from "../screens/Auth/LoginScreen.jsx";
import RegistrationScreen from "../screens/Auth/RegistrationScreen.jsx";

export default function AuthNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Stack.Screen name="Auth" component={AuthGateScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
    </Stack.Navigator>
  );
}
