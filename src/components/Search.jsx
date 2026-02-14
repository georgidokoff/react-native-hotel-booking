import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { defaultTheme } from "../helpers/styleHelper";

export default function Search({}) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={24} color={defaultTheme.greyColor} />
      <TextInput placeholder="Search" style={styles.searchInput} />
      <Ionicons
        name="options-outline"
        size={24}
        color={defaultTheme.primaryColor}
      />
    </View>
  );
}
