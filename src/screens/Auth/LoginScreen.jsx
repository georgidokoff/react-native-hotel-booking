import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { defaultTheme } from "../../helpers/styleHelper";
import { styles } from "./styles";

export default function LoginScreen() {
  const route = useRoute();
  const { onSignIn, onSignUpNavigate, onGuestNavigate } = route?.params || {};
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [emailColor, setEmailColor] = useState(defaultTheme.greyColor);
  const [passwordColor, setPasswordColor] = useState(defaultTheme.greyColor);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  //   const [rememberMe, setRememberMe] = useState(false);

  const onGuestNavigateHandler = () => {
    if (onGuestNavigate) {
      onGuestNavigate();
    }
  };

  const onSignUpNavigateHandler = () => {
    if (onSignUpNavigate) {
      onSignUpNavigate();
    }
  };

  const onSignInHandlerPress = () => {
    if (onSignIn) {
      onSignIn(login, password);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { paddingHorizontal: 16, marginTop: 60 }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <View>
          <Text style={[styles.headerText, { fontSize: 32 }]}>
            Login to your Account
          </Text>

          <View style={[styles.inputWrapper, styles.inputActive,{borderColor: emailColor}]}>
            <Ionicons
              name="mail"
              size={20}
              color={emailColor}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Email"
              style={[styles.input]}
              placeholderTextColor={defaultTheme.greyColor}
              onChangeText={setLogin}
              onFocus={() => {
                setEmailColor(defaultTheme.primaryColor);
                setPasswordColor(defaultTheme.greyColor);
              }}
              onBlur={() => {
                setEmailColor(defaultTheme.greyColor);
                setPasswordColor(defaultTheme.greyColor);
              }}
            />
          </View>

          <View style={[styles.inputWrapper, styles.inputActive,{borderColor: passwordColor}]}>
            <Ionicons
              name="lock-closed"
              size={20}
              color={passwordColor}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              style={styles.input}
              placeholderTextColor={defaultTheme.greyColor}
              onChangeText={setPassword}
              onFocus={() => {
                setPasswordColor(defaultTheme.primaryColor);
                setEmailColor(defaultTheme.greyColor);
              }}
              onBlur={() => {
                setPasswordColor(defaultTheme.greyColor);
                setEmailColor(defaultTheme.greyColor);
              }}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={defaultTheme.greyColor}
              />
            </TouchableOpacity>
          </View>

          {/* TODO: Add Remember Me functionality */}
          {/* <View style={styles.rememberRow}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                style={[styles.checkbox, rememberMe && styles.checkboxSelected]}
              >
                {rememberMe && (
                  <Ionicons name="checkmark" size={12} color="white" />
                )}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>
          </View> */}

          <TouchableOpacity
            style={styles.signBtn}
            onPress={onSignInHandlerPress}
          >
            <Text style={styles.signBtnText}>Sign in</Text>
          </TouchableOpacity>

          {/* Todo: Add forgot password functionality */}
          {/* <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot the password?</Text>
          </TouchableOpacity> */}

          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.socialBtn}
            onPress={onGuestNavigateHandler}
          >
            <Ionicons name="enter-outline" size={30} color="#1877F2" />
            <Text style={styles.socialBtnText}>Continue as Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerLink}
            onPress={onSignUpNavigateHandler}
          >
            <Text>
              Don't have an account?{" "}
              <Text style={styles.greenText}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
