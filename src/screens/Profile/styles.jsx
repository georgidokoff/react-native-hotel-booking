import { StyleSheet } from "react-native";

import { defaultTheme } from "../../helpers/styleHelper";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 15,
  },
  scrollContent: {
    paddingHorizontal: 24,
    alignItems: "center",
  },

  // Avatar Styles
  avatarContainer: {
    marginVertical: 30,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  editButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#1AB65C",
    padding: 6,
    borderRadius: 8,
  },
  disabledButton: { backgroundColor: defaultTheme.greyColor },

  // Input Field Styles
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#212121",
  },

  // Specialized Phone Input
  phoneInputRow: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 20,
    alignItems: "center",
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#EEEEEE",
    paddingRight: 10,
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 5,
  },

  // Footer Button
  footer: {
    padding: 24,
  },
  continueButton: {
    backgroundColor: "#1AB65C",
    borderRadius: 30,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8, // Per image, it looks slightly translucent or muted before focus
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
