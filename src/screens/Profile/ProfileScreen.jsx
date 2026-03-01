import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    RefreshControl,
    Keyboard
} from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Camera from "../../common/Camera.jsx";

import { validate } from "../../helpers/validatorsHelper.js";
import { usePersistedState } from "../../hooks/usePersistedState.js";
import { authKey, Guest, nameType, phoneType } from "../../shared/constants.js";
import { useUser } from "../../contexts/users/useUser.js";

import { defaultTheme } from "../../helpers/styleHelper";
import { styles } from "./styles";

export default function ProfileScreen({ navigation, route }) {
    const [errorState, setErrorState] = useState({ valid: true, message: "" });
    const [successMessage, setSuccessMessage] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const { updateUser, isLoading, error, clearError } = useUser();
    const phoneInputRef = useRef(null);
    const [profileImageUri, setProfileImageUri] = useState(null);
    const [auth, setAuth] = usePersistedState(authKey, {
        user: null,
        accessToken: null,
    });

    const [user, setUser] = useState(auth?.user || null);

    useEffect(() => {
        setErrorState({ valid: !error, message: error });
    }, [route.params, error]);

    useEffect(() => {
        if (auth?.user) {
            setUser(auth.user);
        }
    }, [auth]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setErrorState({ valid: true, message: "" });
        setSuccessMessage("");

        if (auth?.user) {
            setUser(auth.user);
            setRefreshing(false);
        }

        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const updateUserHandler = async () => {
        clearError();
        setErrorState({ valid: true, message: "" });
        setSuccessMessage("");

        user.id = auth.user.id;
        user.locale = auth.user.locale;
        user.status = auth.user.status;

        // Validate name and phone before sending update request
        const nameValidation = validate(user.name, nameType);
        const phoneValidation = validate(user.phone, phoneType);

        if (!nameValidation?.valid) {
            setErrorState(nameValidation);
            return;
        }

        if (!phoneValidation?.valid) {
            setErrorState(phoneValidation);
            return;
        }

        if (!!profileImageUri) {
            user.image = profileImageUri;
        }

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

        if (error) {
            setSuccessMessage("");

            setErrorState({ valid: false, message: error });
            setTimeout(() => {
                setErrorState({ valid: true, message: "" });
                clearError();
            }, 3000);
        }

        if (!!updatedUser) {
            setErrorState({ valid: true, message: "" });

            setSuccessMessage("Profile updated successfully!");
            setTimeout(() =>
                setSuccessMessage(""), 3000);
        }
    };

    const updateInputHandler = (input, field) => {
        setUser((prevUser) => {
            const updatedUser = { ...prevUser, [field]: input };
            return updatedUser;
        });
    };
    console.log('user', user);
    console.log('profileImageUri', profileImageUri);
    const ProfileInput = ({ placeholder, icon, text, field, disabled }) => {
        const [inputValue, setInputValue] = useState(text);

        const handleKeyPress = ({ nativeEvent }) => {
            if (nativeEvent.key === "Enter" && field === "name" && inputValue.trim()) {
                // Move to phone input if name is filled
                phoneInputRef.current?.focus();
            }
        };

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
                    onSubmitEditing={handleKeyPress}
                    returnKeyType={field === "name" ? "next" : "done"}
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
            {isLoading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size='large' color={defaultTheme.primaryColor} />
                </View>
            )}

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.avatarContainer}>
                    <View style={[styles.avatarPlaceholder, isLoading ? { display: 'none' } : {}]}>
                        {
                            (!!profileImageUri || !!user?.image )
                            ? <Image source={{ uri: !!profileImageUri ? profileImageUri : user.image ?? "" }} style={styles.avatarImage} />
                            : <Ionicons name="person" size={80} color="#E0E0E0" />
                        }
                        {/* <ImagePicker onImagePicked={setImageUri} imageUri={imageUri} /> */}
                        <Camera disabled={user?.status === Guest} onPhotoTaken={setProfileImageUri} />
                    </View>
                </View>

                <ProfileInput
                    placeholder="Name"
                    icon="account-outline"
                    field={"name"}
                    text={user?.name || ""}
                    disabled={user?.status === Guest}
                />

                <ProfileInput
                    placeholder="Email"
                    icon="email-outline"
                    field={"email"}
                    text={user?.email || ""}
                    disabled
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
                        ref={phoneInputRef}
                        placeholder="Phone Number"
                        editable={!(user?.status === Guest)}
                        style={[styles.input, { flex: 1, marginLeft: 10 }]}
                        keyboardType="numeric"
                        value={user?.phone}
                        field={"phone"}
                        onChangeText={(input) => {
                            // Only allow digits and plus sign
                            const digitsOnly = input.replace(/[^+0-9]/g, "");
                            updateInputHandler(digitsOnly, "phone");
                        }}
                    />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                {successMessage && (
                    <View style={styles.successMessageContainer}>
                        <Text style={styles.successMessageText}>{successMessage}</Text>
                    </View>
                )}

                {errorState && !errorState.valid && (
                    <Text style={styles.errorText}>{errorState.message}</Text>
                )}

                <TouchableOpacity
                    disabled={user?.status === Guest}
                    style={[styles.continueButton, user?.status === Guest && styles.disabledButton]}
                    onPress={updateUserHandler}
                >
                    <Text style={styles.continueText}>Update</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
