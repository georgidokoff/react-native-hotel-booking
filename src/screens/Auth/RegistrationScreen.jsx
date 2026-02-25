import { useEffect, useState } from "react";
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

export default function RegistrationScreen() {
  const route = useRoute();
  const { onGuestNavigate, onSignInNavigate, onSignUp } = route?.params || {};
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [emailColor, setEmailColor] = useState(defaultTheme.greyColor);
  const [passwordColor, setPasswordColor] = useState(defaultTheme.greyColor);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState({ valid: true, message: "" });
  // const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    setErrorState({ valid: true, message: "" });
  }, [route.params]);

  const onGuestHandlerPress = () => {
    if (onGuestNavigate) {
      onGuestNavigate();
    }
  };

  const onSignUpHandlerPress = () => {
    if (onSignUp) {
      onSignUp(email, password)
        .then((validation) => {
          if (!validation?.valid) {
            // handle validation error
            setErrorState(validation);
          }
        });
    }
  };

  const onSignInHandlerPress = () => {
    if (onSignInNavigate) {
      onSignInNavigate();
    }
  };

  const setEmailHandler = (text) => {
    setEmail(text);
    if (errorState && !errorState.valid) {
      setErrorState({ valid: true, message: "" });
    }
  };

  const setPasswordHandler = (text) => {
    setPassword(text);
    if (errorState && !errorState.valid) {
      setErrorState({ valid: true, message: "" });
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
        <View style={styles.innerContainer}>
          <Text style={[styles.headerText, { fontSize: 32 }]}>
            Create your Account
          </Text>

          <View style={[styles.inputWrapper, styles.inputActive, { borderColor: emailColor }]}>
            <Ionicons
              name="mail"
              size={20}
              color={emailColor}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              placeholderTextColor={defaultTheme.greyColor}
              keyboardType="email-address"
              onChangeText={setEmailHandler}
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

          <View style={[styles.inputWrapper, styles.inputActive]}>
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
              onFocus={() => {
                setPasswordColor(defaultTheme.primaryColor);
                setEmailColor(defaultTheme.greyColor);
              }}
              onBlur={() => {
                setPasswordColor(defaultTheme.greyColor);
                setEmailColor(defaultTheme.greyColor);
              }}
              onChangeText={setPasswordHandler}
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

          {/*TODO: Remember Me Toggle */}
          {/* <View style={styles.rememberRow}>
            <TouchableOpacity 
              style={styles.checkboxRow} 
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxSelected]}>
                {rememberMe && <Ionicons name="checkmark" size={12} color="white" />}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>
          </View> */}

          {errorState && !errorState.valid && (
            <Text style={styles.errorText}>{errorState.message}</Text>
          )}

          <TouchableOpacity
            style={styles.signBtn}
            onPress={onSignUpHandlerPress}
          >
            <Text style={styles.signBtnText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.socialBtn}
            onPress={onGuestHandlerPress}
          >
            <Ionicons name="enter-outline" size={30} color={defaultTheme.faceBookColor} />
            <Text style={styles.socialBtnText}>Continue as Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerLink}
            onPress={onSignInHandlerPress}
          >
            <Text style={styles.promptText}>
              Already have an account?{" "}
              <Text style={styles.greenText}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
