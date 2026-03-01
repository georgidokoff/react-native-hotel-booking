import { launchCameraAsync, useCameraPermissions } from 'expo-image-picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
    ActivityIndicator,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';

import { defaultTheme } from '../helpers/styleHelper';

export default function Camera({
    style,
    onPhotoTaken,
    disabled = false,
}) {

    const [cameraPermission, requestCameraPermission] = useCameraPermissions();

    if (!cameraPermission) {
        return <ActivityIndicator size="large" color={defaultTheme.primaryColor} />;
    }

    const requestPermission = async () => {
        const permissionResult = await requestCameraPermission();
    };

    const takePhotoHandler = async () => {

        if (!cameraPermission || cameraPermission.status !== 'granted') {

            const permissionResult = await requestCameraPermission();

            if (!permissionResult.granted) {
                return (
                    <View style={defaultTheme.camera.permissionContainer}>
                        <Text style={defaultTheme.camera.permissionText}>Camera access is required to take photos.</Text>
                        <TouchableOpacity
                            disabled={disabled}
                            onPress={requestPermission}
                            style={defaultTheme.camera.permissionButton}>
                            <Text style={defaultTheme.camera.permissionButtonText}>Grant Permission</Text>
                        </TouchableOpacity>
                    </View>
                );
            }
        }

        try {
            const result = await launchCameraAsync({
                mediaTypes: 'Images',
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
            });

            if (!result.canceled) {
                console.info('Photo taken:', result.assets[0].uri);
                // Handle the photo URI as needed (e.g., upload or display)
                if (onPhotoTaken) {
                    onPhotoTaken(result.assets[0].uri);
                }
            }
        } catch (error) {
            console.error('Error launching camera:', error);
            return { valid: false, message: 'An error occurred while trying to access the camera.' };
        }
    };

    return (
        <View style={style}>
            <TouchableOpacity
                disabled={disabled}
                style={[defaultTheme.camera.editButton, disabled && { backgroundColor: defaultTheme.greyColor }]}
                onPress={takePhotoHandler}>
                <MaterialCommunityIcons name="pencil" size={16} color="white" />
            </TouchableOpacity>
        </View>
    );
}