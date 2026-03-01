import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

import { SuccessBookingModal } from '../../components/SuccessBookingModal'
import { TicketModal } from '../../components/TicketModal';

import { usePersistedState } from '../../hooks/usePersistedState';
import { useBooking } from '../../contexts/bookings/useBooking';
import { authKey, EUR } from '../../shared/constants';
import { getDate } from '../../helpers/commonHelper'

import { defaultTheme } from '../../helpers/styleHelper';
import { styles } from './styles'

export default function BookingDateScreen({ navigation, route }) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [visibleViewTicket, setVisibleViewTicket] = useState(false);
    const params = useState(route.params && route.params);
    const item = params.at(0);
    const [auth] = usePersistedState(authKey, {
        user: null,
        accessToken: null,
    });
    const { create } = useBooking();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guests, setGuests] = useState(1);
    let book = {};

    const onDayPressHandler = (date) => {
        const dateString = date.dateString;
        if (!startDate || (startDate && endDate)) {
            setStartDate(dateString);
            setEndDate(null);
        } else if (startDate && !endDate) {
            if (dateString < startDate) {
                setStartDate(dateString);
                setEndDate(null);
            } else if (dateString > startDate) {
                setEndDate(dateString);
            }
        }
    }

    const getMarkedDates = () => {
        if (!startDate) return {};
        let marked = {};
        if (!endDate || startDate === endDate) {
            marked[startDate] = { startingDay: true, endingDay: true, color: defaultTheme.primaryColor, textColor: 'white' };
        } else {
            let current = new Date(startDate);
            const end = new Date(endDate);
            while (current <= end) {
                const dateStr = current.toISOString().slice(0, 10);
                if (dateStr === startDate) {
                    marked[dateStr] = { startingDay: true, color: defaultTheme.primaryColor, textColor: 'white' };
                } else if (dateStr === endDate) {
                    marked[dateStr] = { endingDay: true, color: defaultTheme.primaryColor, textColor: 'white' };
                } else {
                    marked[dateStr] = { color: '#E8F8EF', textColor: defaultTheme.primaryColor };
                }
                current.setDate(current.getDate() + 1);
            }
        }
        return marked;
    };

    const calculatePriceHandler = () => {
        const oneDayAsMiliseconds = 86400000;
        const selectedDifference = new Date(endDate) - new Date(startDate);
        const calculatedPrice = item?.price_per_night * Number(guests ?? 1) * selectedDifference / oneDayAsMiliseconds;
        const price = calculatedPrice > 0 ? calculatedPrice : 0;

        book = {
            "name": item.name,
            "location": item.location,
            "price": price,
            "tag": "Pending",
            "state": "Pending",
            "userId": auth?.user?.id,
            "checkIn": startDate,
            "checkOut": endDate,
            "hotelId": item?.id,
            "resourceId": "not apply",
            "imageUrl": item.image_url,
            "city": item.city,
            "country": item.country_code,
            "id": item.objectId,
            "ownerId": auth?.user?.id
        };

        return price;
    }

    const payBookingHandler = async () => {
        if (book && book.price > 0) {
            book.tag = 'Paid';
            book.state = 'Ongoing';
            
            await create(book, auth?.accessToken)
                .then((newBooking) => {
                    setIsSuccess(true);
                })
                .catch((err) => console.error('Error during booking payment:', err))
        }
    }
    const onViewTicketHandler = () => {
        setVisibleViewTicket(true);
    }

    const onCloseViewTicket = () => {
        setVisibleViewTicket(false);
    }
    
    const onCLoseHandler = () => {
        navigation.goBack();

        try {
            navigation.goBack();
        } catch {}

        setIsSuccess(false);
    }

    const DateDisplay = ({ label, date, onPress }) => (
        <TouchableOpacity style={styles.dateBox} onPress={onPress}>
            <Text style={styles.dateLabel}>{label}</Text>
            <View style={styles.dateValueContainer}>
                <Ionicons name="calendar-outline" size={20} color="#212121" />
                <Text style={styles.dateValueText}>{date}</Text>
            </View>
        </TouchableOpacity>
    );
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.calendarCard}>
                    <Calendar
                        current={getDate()}
                        minDate={getDate(1)}
                        markingType={'period'}
                        markedDates={getMarkedDates()}
                        onDayPress={onDayPressHandler}
                        theme={styles.calendarTheme}
                    />
                </View>

                {startDate && endDate &&
                    <View style={styles.dateRow}>
                        <DateDisplay
                            label="Check in"
                            date={startDate}
                        />
                        <Ionicons name="arrow-forward" size={20} color="#212121" style={{ marginTop: 25 }} />
                        <DateDisplay
                            label="Check out"
                            date={endDate}
                        />
                    </View>
                }

                <Text style={styles.sectionTitle}>Guest</Text>
                <View style={styles.counterContainer}>
                    <TouchableOpacity onPress={() => setGuests(Math.max(1, guests - 1))} style={styles.counterBtn}>
                        <Ionicons name="remove" size={24} color={defaultTheme.primaryColor} />
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{guests}</Text>
                    <TouchableOpacity onPress={() => setGuests(guests + 1 >= 1 && guests < item?.occupancy ? guests + 1 : item?.occupancy ?? 0)} style={styles.counterBtn}>
                        <Ionicons name="add" size={24} color={defaultTheme.primaryColor} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: {EUR}{' '}{calculatePriceHandler()}</Text>
                <TouchableOpacity style={styles.payBtn} onPress={payBookingHandler}>
                    <Text style={styles.payBtnText}>Pay</Text>
                </TouchableOpacity>
            </View>

            {isSuccess &&
                <SuccessBookingModal
                    isVisible={isSuccess}
                    onViewTicket={onViewTicketHandler}
                    onClose={onCLoseHandler}
                />}

            {
                visibleViewTicket &&
                <TicketModal
                    bookingItem={{
                        ...book,
                        qrCOdeValue: book.name,
                        resourceTypeName: `${book.name ?? ''}\n${book.kind ?? ''}`,
                        occupancy: `${guests?? ''}`,
                        userFullname: `${auth?.user?.name ?? ''}`,
                        userPhone: `${auth?.user?.phone ?? ''}`,
                    }}
                    isVisible={visibleViewTicket}
                    onCloseViewTicket={onCloseViewTicket}
                />
            }
        </SafeAreaView>
    );
};