import { useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../contexts/auth/useAuth.js";
import { emailType, passwordType, authKey } from "../../shared/constants.js";
import { validate } from "../../helpers/validatorsHelper.js";

import { styles } from "./styles";
import { defaultTheme } from "../../helpers/styleHelper.js";

export default function AuthGateScreen({ navigation }) {
    const { login, register, loginGuest, isLoading, error, clearError } = useAuth();  

    const signInHandler = async (email, password) => {
        clearError();

        const emailValidation = validate(email, emailType);

        if (!emailValidation?.valid) {
            return emailValidation;
        }

        const passwordValidation = validate(password, passwordType);

        if (!passwordValidation?.valid) {
            return passwordValidation;
        }

        if (error) {
            return { valid: false, message: error };
        }

        return await login(email, password);
    };
    
    const signUpHandler = async (email, password) => {
        clearError();

        const emailValidation = validate(email, emailType);

        if (!emailValidation?.valid) {
            return emailValidation;
        }

        const passwordValidation = validate(password, passwordType);
        if (!passwordValidation?.valid) {
            return passwordValidation;
        }

        if (error) {
            return { valid: false, message: error };
        }

        return await register(email, password, null);
    };

    const guestHandler = async () => {
        clearError();

        return await loginGuest();
    };

    const signUpNavigateHandler = () => {
        navigation.goBack();

        onSignUpHandler();
    };

    const onSignUpHandler = () => {
        navigation.navigate("Register", {
            onSignInNavigate: signInNavigateHandler,
            onSignUp: signUpHandler,
            onGuestNavigate: guestNavigateHandler,
        });
    };

    const signInNavigateHandler = () => {
        navigation.goBack();

        onSignInHandler();
    };

    const onSignInHandler = () => {
        navigation.navigate("Login", {
            onSignIn: signInHandler,
            onSignUpNavigate: signUpNavigateHandler,
            onGuestNavigate: guestNavigateHandler,
        });
    };

    const guestNavigateHandler = () => {
        navigation.goBack();

        guestHandler();
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", (e) => {
            const { action } = e;
            if (action.payload?.params?.action === "guest") {
                e.preventDefault();
                guestHandler();
            } else if (action.payload?.params?.action === "signUp") {
                e.preventDefault();
                signUpHandler();
            } else if (action.payload?.params?.action === "signIn") {
                e.preventDefault();
                signInHandler();
            } else if (action.payload?.params?.action === "onSignUpNavigate") {
                e.preventDefault();
                signUpNavigateHandler();
            } else if (action.payload?.params?.action === "onSignInNavigate") {
                e.preventDefault();
                signInNavigateHandler();
            } else if (action.payload?.params?.action === "onGuestNavigate") {
                e.preventDefault();
                guestNavigateHandler();
            }
        });

        return unsubscribe;
    }, [
        navigation,
        guestHandler,
        signUpHandler,
        signInHandler,
        signUpNavigateHandler,
        signInNavigateHandler,
        guestNavigateHandler,
    ]);
    
    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size='large' color={defaultTheme.primaryColor} />
                </View>
            ) :
                <View style={styles.centerContent}>
                    <Text style={styles.headerText}>Let's you in</Text>

                    <TouchableOpacity style={styles.socialBtn} onPress={guestHandler}>
                        <Ionicons name="enter-outline" size={30} color={defaultTheme.faceBookColor} />
                        <Text style={styles.socialBtnText}>Continue as Guest</Text>
                    </TouchableOpacity>

                    <View style={styles.dividerRow}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>or</Text>
                        <View style={styles.line} />
                    </View>

                    <TouchableOpacity style={styles.primaryBtn} onPress={onSignInHandler}>
                        <Text style={styles.primaryBtnText}>Sign in with password</Text>
                    </TouchableOpacity>

                    <Text style={styles.footerLink} onPress={onSignUpHandler}>
                        Don't have an account? <Text style={styles.greenText}>Sign up</Text>
                    </Text>
                </View>}
        </SafeAreaView>
    );
}
