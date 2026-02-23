import { StyleSheet } from "react-native";
import { defaultTheme } from "../helpers/styleHelper";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", marginLeft: 15 },
  scrollContent: { padding: 20, paddingBottom: 100 },

  ticketCard: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingTop: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#212121",
  },
  qrSection: {
    alignItems: "center",
    marginBottom: 40,
  },

  // Perforation Effect
  perforationContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    overflow: "hidden",
  },
  leftCutout: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F8F8F8",
    marginLeft: -10,
  },
  rightCutout: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F8F8F8",
    marginRight: -10,
  },
  dashLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderStyle: "dashed",
    marginHorizontal: 5,
  },

  // Info Grid
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 25,
    paddingTop: 10,
  },
  detailItem: {
    width: "50%",
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: "#9E9E9E",
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  downloadButton: {
    backgroundColor: defaultTheme.primaryColor,
    paddingVertical: 18,
    borderRadius: 35,
    alignItems: "center",
  },
  downloadText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
});
