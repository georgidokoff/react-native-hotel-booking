import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { styles } from "./TicketModalStyles";

export const TicketModal = ({ bookingItem, isVisible, onCloseViewTicket }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCloseViewTicket}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.ticketCard}>
          <Text style={styles.hotelName}>{bookingItem.name}</Text>

          <View style={styles.qrSection}>
            <QRCode
              value={bookingItem.qrCOdeValue ?? ""}
              size={180}
              color="black"
              backgroundColor="white"
            />
          </View>

          <View style={styles.perforationContainer}>
            <View style={styles.leftCutout} />
            <View style={styles.dashLine} />
            <View style={styles.rightCutout} />
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{bookingItem.userFullname}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.value}>{bookingItem.userPhone}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Check in</Text>
              <Text style={styles.value}>{bookingItem.checkIn}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Check out</Text>
              <Text style={styles.value}>{bookingItem.checkOut}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Hotel</Text>
              <Text style={styles.value}>{bookingItem.resourceTypeName}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Ocupancy</Text>
              <Text style={styles.value}>{bookingItem.occupancy}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={onCloseViewTicket}
        >
          <Text style={styles.downloadText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
