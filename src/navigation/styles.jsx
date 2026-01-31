import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    bottomTab: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
        paddingVertical: 10,
        justifyContent: "space-around",
        backgroundColor: "#fff",
    },
    tabItem: {
        alignItems: "center"
    },
    tabLabel: {
        fontSize: 12,
        color: "#9E9E9E",
        marginTop: 4
    },
    tabLabelActive: {
        color: "#1AB65C",
        fontWeight: "bold"
    }
});