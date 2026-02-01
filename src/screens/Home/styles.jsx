import { StyleSheet } from "react-native";

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
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderBlockColor: '#1AB65C',
    borderWidth: 0.5,
    margin: 20,
    padding: 5, 
    borderRadius: 15, 
    alignItems: 'center'
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16
  },
  categoryScroll: {
    paddingLeft: 20,
    marginBottom: 20
  },
  categoryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1AB65C',
    marginRight: 10,
  },
  categoryBtnActive: {
    backgroundColor: '#1AB65C'
  },
  categoryText: {
    color: '#1AB65C',
    fontWeight: 'bold',
    fontSize: 10
  },
  categoryTextActive: {
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
    color: '#1AB65C',
    fontWeight: 'bold'
  },
});