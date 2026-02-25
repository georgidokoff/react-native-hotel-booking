import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "#9E9E9E",
    marginTop: 4,
  },
  tabLabelActive: {
    color: "#1AB65C",
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#1AB65C",
  },
  activeTab: {
    backgroundColor: "#1AB65C",
  },
  tabText: {
    color: "#1AB65C",
    fontWeight: "bold",
    fontSize: 12,
  },
  activeTabText: {
    color: "#fff",
  },
  errorText: {
    color: "#F75555",
    textAlign: "center",
    marginBottom: 16,
  },Í
});
