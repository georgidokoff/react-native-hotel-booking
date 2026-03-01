import { View, Text, StyleSheet } from 'react-native';

export default function Empty({
    message = "No data available.",
    style = {} }
) {
    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.message, style]}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        color: '#667',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
}); 