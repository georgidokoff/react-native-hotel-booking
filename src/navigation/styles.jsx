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
    },
    tabsNavigator: {
        tabBarStyle: {
            flexDirection: "row",
            borderTopWidth: 1,
            borderTopColor: "#EEE",
            paddingVertical: 10,
            justifyContent: "space-around",
            backgroundColor: "#fff",
        },
        tabBarActiveTintColor: "#1AB65C",
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 4,
        },
        headerLeftContainerStyle: {
            paddingLeft: 32
        },
        headerTitleContainerStyle: {
            paddingBottom: 0,
        },
        headerRightContainerStyle: {
            marginRight: 20
        },
    },
    stackHeaderLeft: {
        width: 32,
        height: 32,
        marginLeft: -20,
        marginRight: 0,
    },
    homeNavigatorView: {
        padding: 16,
        backgroundColor:"#fff"
    }
});