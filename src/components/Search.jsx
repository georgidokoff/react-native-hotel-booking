import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from "./styles";

export default function Search({}){

    return (
        <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9E9E9E" />
            <TextInput placeholder="Search" style={styles.searchInput} />
            <Ionicons name="options-outline" size={20} color="#1AB65C" />
        </View>);
}