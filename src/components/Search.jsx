import { useEffect, useState } from "react";
import { View, TextInput, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { keyboardDismissDelay } from "../shared/constants";

import { defaultTheme } from "../helpers/styleHelper";
import { styles } from "./styles";

export default function Search({ input, setInput }) {
  const [dateTimeUnix, setDateTimeUnix] = useState(0);


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (input) {
        setDateTimeUnix(new Date().getTime());
        Keyboard.dismiss();
      }
    }, keyboardDismissDelay);

    return () => clearTimeout(delayDebounceFn);
  }
  , [input]);

  const changeTextHandler = (value) => {
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
