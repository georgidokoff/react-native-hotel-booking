import { useState, useEffect, useCallback } from "react";
import {
    View,
    FlatList,
    Text,
    RefreshControl,
    ActivityIndicator,
} from "react-native";

import BookingCard from "../../components/BookingCard";
import Empty from "../../common/Empty.jsx";
import { Tab } from "../../common/Tab.jsx";

import { usePersistedState } from "../../hooks/usePersistedState.js";
import { authKey, Canceled, CanceledNRefunded, Completed, Ongoing } from "../../shared/constants.js";
import { tabs } from "../../helpers/commonHelper.js";
import { useBooking } from "../../contexts/bookings/useBooking.js";
import { useHotel } from "../../contexts/hotels/useHotel.js";

import { styles } from "./styles";
import { defaultTheme } from "../../helpers/styleHelper.js";

export default function BookingScreen({ navigation, route }) {
    const [errorState, setErrorState] = useState({ valid: true, message: "" });
    const [refreshing, setRefreshing] = useState(false);
    const [auth] = usePersistedState(authKey, null);
    const { getByUserId, update, remove, isLoading, error, clearError } = useBooking();
    const { hotels } = useHotel();

    const [activeTab, setActiveTab] = useState(Ongoing);
    const [bookingsData, setBookingsData] = useState([]);

    const fetchBookings = async () => {
        clearError();

        if (auth && auth.user.id && auth.accessToken) {
            const currentDate = new Date().toISOString().substring(0, 10);

            try {
                await getByUserId(auth.user.id, auth.accessToken)
                    .then((bookings) => {
                        let bookingsMappedData = [];
                        if (Array.isArray(bookings) && bookings.length > 0) {
                            bookingsMappedData = bookings
                                .map((b) => ({
                                    ...b,
                                    kind: hotels?.find(h => h?.id === b?.hotelId)?.kind,
                                    occupancy: hotels?.find(h => h?.id === b?.hotelId)?.occupancy,
                                    state: (b.state === Ongoing && b.checkIn < currentDate)
                                        ? Completed
                                        : b.state
                                }));

                        }

                        setBookingsData(bookingsMappedData);
                        setRefreshing(false);
                    })
                    .catch((err) => {
                        setBookingsData([]);

                        setErrorState({ valid: false, message: "Error fetching bookings." })
                    });

            } catch (err) {
                setBookingsData([]);

                setErrorState({ valid: false, message: "Error fetching bookings." })
            }
        }
    };

    useEffect(() => {
        setErrorState({ valid: !error, message: error });
    }, [route.params, error]);

    useEffect(() => {
        fetchBookings();
    }, [auth]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);

        if (auth?.user) {
            await fetchBookings();
        }
    }, [auth]);

    const tabPressHandler = (tab) => {
        setActiveTab(tab);
    };

    const cancelBookingCardHandler = async (id) => {
        let canceledBooking = bookingsData.find((od) => od.objectId === id);
        canceledBooking.state = Canceled;
        canceledBooking.tag = CanceledNRefunded;

        try {
             await update(canceledBooking, auth.accessToken);

        if (Array.isArray(bookingsData) && bookingsData.length > 0) {
            setBookingsData([
                ...bookingsData?.filter((od) => od.objectId !== canceledBooking.objectId),
                canceledBooking,
            ]);
        }
        } catch (err) {
            setBookingsData([]);

            setErrorState({ valid: false, message: "Error canceling booking." });
        }      
    };

    const onRemoveBookingCardHandler = async (id) => {
        try {
            await remove(id, auth.accessToken);

            setBookingsData(!!bookingsData ? bookingsData.filter((od) => (od.objectId ?? od.id) !== id) : []);

        } catch (err) {
            setBookingsData([]);

            setErrorState({ valid: false, message: "Error removing booking." });
        }
    }
    return (
        <View style={styles.container}>

            <View style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <Tab
                        key={tab}
                        tabPressHandler={tabPressHandler}
                        style={{ ...styles }}
                        tab={tab}
                        activeTab={activeTab}
                    />
                ))}
            </View>

            {errorState && !errorState.valid && (
                <Text style={styles.errorText}>{errorState.message}</Text>
            )}

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size='large' color={defaultTheme.primaryColor} />
                </View>
            ) : (
                <FlatList
                    data={
                        bookingsData && bookingsData.filter((od) =>
                            od.state === activeTab)
                    }
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    keyExtractor={(item) => item.created}
                    renderItem={({ item }) => (
                        <BookingCard
                            item={{
                                ...item,
                                userFullname: auth?.user?.name,
                                userPhone: auth?.user?.phone,
                            }}
                            status={activeTab}
                            onCancelBookingCard={cancelBookingCardHandler}
                            onRemoveBookingCard={onRemoveBookingCardHandler}
                        />
                    )}
                    contentContainerStyle={{ padding: 20 }}
                    ListEmptyComponent={
                        <Empty message="No bookings found." />
                    }
                />)}
        </View>
    );
}
