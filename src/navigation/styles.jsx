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
        marginTop: 8
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
            paddingTop: 12
        },
        tabBarActiveTintColor: "#1AB65C",
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 8,
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
        // headerStyle: {
        //     height: 100,              
        //     backgroundColor: '#fff', 
        // },
        headerStatusBarHeight: 0,
        nargubTop: 16
    },
    stackHeaderLeft: {
        width: 32,
        height: 32,
        marginLeft: -20,
        marginRight: 0,
    },
    nestedNavigatorView: {
        //padding: 16,
        paddingLeft: 20,
        paddingRight: 16,
        backgroundColor: "#fff",
        // height: 100,
    }
});