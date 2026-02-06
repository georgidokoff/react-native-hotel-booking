import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback 
} from 'react-native';

import { styles } from './CancelBookingModalStyles';

export const CancelBookingModal = ({ isVisible, onCancel, onConfirm }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              
              <View style={styles.handle} />

              <Text style={styles.modalHeader}>Cancel Booking</Text>
              
              <View style={styles.divider} />

              <Text style={styles.mainQuestion}>
                Are you sure you want to cancel your hotel booking?
              </Text>

              <Text style={styles.policyText}>
                Only 80% of the money you can refund from your payment according to our policy
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.cancelActionBtn} 
                  onPress={onCancel}
                >
                  <Text style={styles.cancelActionText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.continueBtn} 
                  onPress={onConfirm}
                >
                  <Text style={styles.continueText}>Yes, Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};