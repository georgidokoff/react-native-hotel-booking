import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

export function Tab({
    tab,
    tabPressHandler,
    style,
    activeTab
}) {
    return (
        <View>
            <TouchableOpacity
                key={tab}
                onPress={() => tabPressHandler(tab)}
                style={[style.tab, activeTab === tab && style.activeTab]}
            >
                <Text
                    style={[
                        style.tabText,
                        activeTab === tab && style.activeTabText,
                    ]}
                >
                    {tab}
                </Text>
            </TouchableOpacity>
        </View>)
}