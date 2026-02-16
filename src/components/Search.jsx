import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { defaultTheme } from "../helpers/styleHelper";
import { styles } from "./styles";

export default function Search({ input, setInput }) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={24} color={defaultTheme.greyColor} />
      <TextInput
        placeholder="Search"
        style={styles.searchInput}
        value={input}
        onChangeText={(value) => setInput(value)}
      />
      <Ionicons
        name="options-outline"
        size={24}
        color={defaultTheme.primaryColor}
      />
    </View>
  );
}
