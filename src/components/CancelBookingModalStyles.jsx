import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
    justifyContent: 'flex-end', // Aligns card to bottom
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 8,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 24,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F75555', // Red header color from image
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#EEEEEE',
    marginBottom: 24,
  },
  mainQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#212121',
    lineHorizontal: 28,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  policyText: {
    fontSize: 14,
    color: '#424242',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  cancelActionBtn: {
    flex: 1,
    backgroundColor: '#E8F8EF', // Light green tint
    paddingVertical: 16,
    borderRadius: 30,
    marginRight: 12,
    alignItems: 'center',
  },
  cancelActionText: {
    color: '#1AB65C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueBtn: {
    flex: 1,
    backgroundColor: '#1AB65C', // Solid green
    paddingVertical: 16,
    borderRadius: 30,
    marginLeft: 12,
    alignItems: 'center',
    // Button shadow
    elevation: 4,
    shadowColor: '#1AB65C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});