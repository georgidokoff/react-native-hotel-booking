import { View, TextInput, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { defaultTheme } from "../helpers/styleHelper";
import { styles } from "./styles";

export default function Search({ input, setInput }) {

  const changeTextHandler = (value) => {
    if (value) {
      setTimeout(() => {
        Keyboard.dismiss();
      }, 2000);
    }
    
    setInput(value);
  };

  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={24} color={defaultTheme.greyColor} />
      <TextInput
        placeholder="Search"
        style={styles.searchInput}
        value={input}
        onChangeText={changeTextHandler}
      />
      <Ionicons
        name="options-outline"
        size={24}
        color={defaultTheme.primaryColor}
      />
    </View>
  );
}
