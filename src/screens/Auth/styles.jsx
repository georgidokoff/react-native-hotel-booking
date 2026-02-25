import { StyleSheet } from "react-native";

import { defaultTheme } from "../../helpers/styleHelper.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },

  primaryBtn: {
    backgroundColor: defaultTheme.primaryColor,
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    elevation: 4,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  socialBtnText: {
    marginLeft: 12,
    fontWeight: "600",
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: {
    color: "#F75555",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  policyText: {
    textAlign: "center",
    color: "#616161",
    lineHeight: 22,
    marginBottom: 30,
  },
  modalBtnRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  secondaryActionBtn: {
    flex: 1,
    backgroundColor: "#E8F8EF",
    padding: 18,
    borderRadius: 30,
    marginRight: 10,
    alignItems: "center",
  },
  primaryActionBtn: {
    flex: 1,
    backgroundColor: defaultTheme.primaryColor,
    padding: 18,
    borderRadius: 30,
    marginLeft: 10,
    alignItems: "center",
  },

  orText: {
    color: defaultTheme.greyColor,
    fontWeight: "bold",
    marginVertical: 16,
    alignContent: "center",
    textAlign: "center",
    padding: 30,
  },
  greenText: {
    color: defaultTheme.primaryColor,
    fontWeight: "bold",
  },
  whiteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 60,
    marginBottom: 20,
  },
  inputActive: {
    backgroundColor: "#F3FAF5",
    borderWidth: 1,
    borderColor: defaultTheme.greyColor,
  },
  inputIcon: { marginRight: 12 },
  input: { 
    flex: 1, 
    fontSize: 16, 
    color: "#212121" 
},
  rememberRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: defaultTheme.primaryColor,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: { backgroundColor: defaultTheme.primaryColor },
  rememberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#212121",
  },
  signBtn: {
    backgroundColor: defaultTheme.primaryColor,
    borderRadius: 30,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
    shadowColor: defaultTheme.primaryColor,
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  signBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  forgotText: {
    color: defaultTheme.primaryColor,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 32,
  },
  footerLink: {
    color: "#8d8d8d",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#F75555",
    textAlign: "center",
    marginBottom: 16,
  },
});
