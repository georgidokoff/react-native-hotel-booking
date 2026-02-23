import { Text, TouchableOpacity, Modal, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { styles } from './SuccessBookingModalStyles'

export const SuccessBookingModal = ({ isVisible, onViewTicket, onClose }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
    >

        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                {/* Animated Success Icon */}
                <View style={styles.successCircle}>
                    <View style={styles.innerCircle}>
                        <Ionicons name="checkmark" size={40} color="white" />
                    </View>
                </View>

                <View style={styles.textHeader}>
                    <Text style={styles.modalHeader}>Payment Successfull!</Text>
                    <Text style={styles.modalSubtext}>
                        Successfully made payment and hotel booking
                    </Text>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.viewTicketBtn} onPress={onViewTicket}>
                        <Text style={styles.whiteText}>View Ticket</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.closeLink} onPress={onClose} >
                        <Text style={styles.greenLinkText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);