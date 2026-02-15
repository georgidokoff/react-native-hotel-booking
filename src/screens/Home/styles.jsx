import { StyleSheet } from "react-native";
import { defaultTheme } from "../../helpers/styleHelper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#520b0bff"
  },
  itemView: {
    padding: 5,
  },
  itemTitle: {
    color: "black",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  categoryScroll: {
    paddingLeft: 20,
    marginBottom: 20
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: defaultTheme.primaryColor,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: defaultTheme.primaryColor
  },
  tabText: {
    color: defaultTheme.primaryColor,
    fontWeight: 'bold',
    fontSize: 10
  },
  activeTabText: {
    color: '#fff'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  seeAll: {
    color: defaultTheme.primaryColor,
    fontWeight: 'bold'
  },
  featuredScroll: {
    paddingLeft: 20,
    marginBottom: 20
  },
});