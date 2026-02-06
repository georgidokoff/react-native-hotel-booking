import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { CancelBookingModal } from "./CancelBookingModal";

import { getStatusColor } from "../helpers/styleHelpers";
import { styles } from "./styles";
import { TicketModal } from "./TicketModal";

export default function BookingCard({ item, status, onCancelBookingCard }) {
  const [visibleCancelConfirmation, setVisibleConfirmation] = useState(false);
  const [visibleViewTicket, setVisibleViewTicket] = useState(false);

  const cancelBookingHandler = (item) => {
    setVisibleConfirmation(true);
  };

  const onCancelationCancelBookingHandler = () => {
    setVisibleConfirmation(false);
  };

  const onConfirmationCancelBookingHandler = (id) => {
    setVisibleConfirmation(false);
    onCancelBookingCard(id);
  };

  const viewTicketHandler = () => {
    setVisibleViewTicket(true);
  };

  const onCloseViewTicketHandler = () => {
    setVisibleViewTicket(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Image
          source={{ uri: item.base64 ? item.base64 : item.imageUrl }}
          style={styles.hotelImage}
        />
        <View style={styles.details}>
          <Text style={styles.hotelName}>{item.name}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(status).bg },
            ]}
          >
            <Text style={{ color: getStatusColor(status).text, fontSize: 10 }}>
              {item.tag}
            </Text>
          </View>
        </View>
      </View>

      {status === "Ongoing" && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={() => cancelBookingHandler(item)}
            style={styles.cancelBtn}
          >
            <Text style={styles.cancelBtnText}>Cancel Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewBtn} onPress={viewTicketHandler}>
            <Text style={styles.viewBtnText}>View Ticket</Text>
          </TouchableOpacity>
        </View>
      )}

      <CancelBookingModal
        isVisible={visibleCancelConfirmation}
        onCancel={onCancelationCancelBookingHandler}
        onConfirm={() => onConfirmationCancelBookingHandler(item.id)}
      />

      <TicketModal
        isVisible={visibleViewTicket}
        bookingItem={{
          ...item,
          qrCOdeValue: item.name,
          resourceTypeName: `${item.name}\nStandart room`,
          occupancy: 3,
          userFullname: "Ivan Ivanov",
          userPhone: "+359888123123"
        }}
        onCloseViewTicket={onCloseViewTicketHandler}
      />
    </View>
  );
}
