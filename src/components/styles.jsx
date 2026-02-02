import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
  featuredCard: {
    width: 300,
    marginHorizontal: 20,
    height: 400,
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative'
  },
  featuredImage: {
    width: '100%',
    height: '100%'
  },
  ratingBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#1AB65C',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 15,
    alignItems: 'center'
  },
  ratingText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold'
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  featuredName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },
  featuredLocation: {
    color: '#fff',
    opacity: 0.8
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  featuredPrice: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  perNight: {
    fontSize: 12,
    fontWeight: 'normal'
  },
  listItem: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset:
      { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  listImage: {
    width: 100,
    height: 100,
    borderRadius: 15
  },
  listContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center'
  },
  listName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  listLocation: {
    color: '#666',
    marginVertical: 4
  },
  listRatingRow:
  {
    flexDirection: 'row',
    alignItems: 'center'
  },
  listRatingText: {
    marginLeft: 5,
    fontWeight: '600'
  },
  reviewText:
  {
    fontWeight: 'normal',
    color: '#9E9E9E'
  },
  listPriceInfo:
  {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  listPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1AB65C'
  },
  perNightSmall: {
    fontSize: 10,
    color: '#9E9E9E'
  },
});