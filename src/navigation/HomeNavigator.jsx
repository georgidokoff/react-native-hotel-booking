import { View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import BookingScreen from "../screens/Booking";

import { ImagesAssets } from '../../assets/images';

import { styles } from './styles'

export default function HomeNavigator({ }) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={HomeScreen}
                options={{
                    //headerTitle: '',
                    headerLeft: () => (
                        <View style={styles.homeNavigatorView}>

                            <Image
                                source={ImagesAssets.logo}
                                style={styles.stackHeaderLeft}
                                resizeMode="contain"
                            />
                        </View>
                    )
                }}
            />

            <Stack.Screen
                name="Search"
                component={SearchScreen}
            />

            <Stack.Screen
                name="Booking"
                component={BookingScreen}
            />

        </Stack.Navigator>
    )
}