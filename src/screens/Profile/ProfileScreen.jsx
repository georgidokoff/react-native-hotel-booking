import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { use, useEffect, useState } from "react";

import { usePersistedState } from "../../hooks/usePersistedState.js";
import { useUser } from "../../contexts/users/useUser.js";

import { defaultTheme } from "../../helpers/styleHelper";
import { styles } from "./styles";

export default function ProfileScreen() {
  const { updateUser } = useUser();
  const [auth, setAuth] = usePersistedState("auth", {
    user: null,
    accessToken: null,
  });
  const [user, setUser] = useState(auth?.user || null);

  useEffect(() => {
    if (auth?.user) {
      setUser(auth.user);
    }
  }, [auth]);
console.log("Auth:", auth);

  const updateUserHandler = async () => {
    user.id = auth.user.id;
    user.locale = auth.user.locale;
    user.status = auth.user.status;

    const updatedUser = await updateUser(user, auth?.accessToken);

    setAuth((prevAuth) => ({
      ...prevAuth,
      user: {
        ...updatedUser,
        id: updatedUser?.objectId ?? auth.user.id,
        locale: updatedUser?.blUserLocale ?? auth.user.locale,
        status: updatedUser?.userStatus ?? auth.user.status,
      },
    }));
  };

  const updateInputHandler = (input, field) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, [field]: input };
      return updatedUser;
    });
  };

  const ProfileInput = ({ placeholder, icon, text, field, disabled }) => {
    const [inputValue, setInputValue] = useState(text);

    return (
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor={defaultTheme.greyColor}
          value={inputValue}
          field={field}
          onChangeText={(input) => {
            setInputValue(input);
          }}
          editable={!disabled}
          onBlur={() => {
            updateInputHandler(inputValue, field);
          }}
        />
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={defaultTheme.greyColor}
          />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={80} color="#E0E0E0" />
            {/* TODO: Add image picker functionality */}
            {/* <TouchableOpacity style={styles.editButton}>
              <MaterialCommunityIcons name="pencil" size={16} color="white" />
            </TouchableOpacity> */}
          </View>
        </View>

        <ProfileInput
          placeholder="Name"
          icon="account-outline"
          field={"name"}
          text={user?.name || ""}
          disabled={user?.status === "GUEST"}
        />

        <ProfileInput
          placeholder="Email"
          icon="email-outline"
          field={"email"}
          text={user?.email || ""}
          disabled={user?.status === "GUEST"}
        />

        <View style={styles.phoneInputRow}>
          <TouchableOpacity style={styles.countryPicker} disabled>
            <Image
              source={{ uri: "https://flagcdn.com/w40/bg.png" }}
              style={styles.flagIcon}
            />
            <Ionicons name="chevron-down" size={16} color="black" />
          </TouchableOpacity>
          <TextInput
            placeholder="Phone Number"
            editable={!(user?.status === "GUEST")}
            style={[styles.input, { flex: 1, marginLeft: 10 }]}
            keyboardType="phone-pad"
            value={user?.phone}
            field={"phone"}
            onChangeText={(input) => updateInputHandler(input, "phone")}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
        disabled={user?.status === "GUEST"}
          style={[styles.continueButton, user?.status === "GUEST" && styles.disabledButton]}
          onPress={updateUserHandler}
        >
          <Text style={styles.continueText}>Update</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
