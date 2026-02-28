import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { CancelBookingModal } from "./CancelBookingModal";
import { TicketModal } from "./TicketModal";

import { Canceled, Ongoing } from "../shared/constants";

import { getStatusColor } from "../helpers/styleHelper";
import { styles } from "./styles";

export default function BookingCard({ item, status, onCancelBookingCard, onRemoveBookingCard }) {
    const [visibleCancelConfirmation, setVisibleConfirmation] = useState(false);
    const [visibleViewTicket, setVisibleViewTicket] = useState(false);

    const cancelBookingHandler = (item) => {
        setVisibleConfirmation(true);
    };
    
    const removeBookingHandler = (id) => {
        onRemoveBookingCard(id);
    };
    
    const onCancelationCancelBookingHandler = () => {
        setVisibleConfirmation(false);
    };
    
    const onConfirmationCancelBookingHandler = (id) => {
        onCancelBookingCard(id);
        setVisibleConfirmation(false);
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
            
            {status === Ongoing && item.checkIn > new Date().toISOString().substring(0, 10) && (
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={() => cancelBookingHandler(item?.objectId)}
                    >
                        <Text style={styles.cancelBtnText}>Cancel Booking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.viewBtn}
                        onPress={viewTicketHandler}>
                        <Text style={styles.viewBtnText}>View Ticket</Text>
                    </TouchableOpacity>
                </View>
            )}

            {status === Canceled && (
                <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeBookingHandler(item.objectId)}>
                    <Text style={styles.removeIcon}>Remove</Text>
                </TouchableOpacity>
            )}

            <TicketModal
                isVisible={visibleViewTicket}
                bookingItem={{
                    ...item,
                    qrCOdeValue: item.name,
                    resourceTypeName: `${item.name ?? ''}\n${item.kind ?? ''}`,
                    occupancy: `${item.occupancy ?? ''}`,
                    userFullname: `${item.userFullname ?? ''}`,
                    userPhone: `${item.userPhone ?? ''}`,
                }}
                onCloseViewTicket={onCloseViewTicketHandler}
            />

            <CancelBookingModal
                isVisible={visibleCancelConfirmation}
                item={item}
                onCancel={onCancelationCancelBookingHandler}
                onConfirm={() => onConfirmationCancelBookingHandler(item?.objectId)}
            />
        </View>
    );
}
