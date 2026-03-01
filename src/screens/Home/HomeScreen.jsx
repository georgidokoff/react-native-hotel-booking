import {
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    RefreshControl,
    Image,
} from "react-native";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { categories, getSearchFieldByName, randomGenerateDigits, setDefaultRefresh } from "../../helpers/commonHelper";
import { authKey, Ongoing, Recommended, Authorised, PerNight } from "../../shared/constants";
import { usePersistedState } from "../../hooks/usePersistedState";
import { useBooking } from "../../contexts/bookings/useBooking";
import { useUser } from "../../contexts/users/useUser";
import { useHotel } from "../../contexts/hotels/useHotel";

import HotelCard from "../../components/HotelCard";
import Search from "../../components/Search";
import { Tab } from "../../common/Tab";

import { ImagesAssets } from "../../../assets/images";
import { styles } from "./styles";
import { TicketModal } from "../../components/TicketModal";
import Empty from "../../common/Empty";

export default function HomeScreen({ navigation }) {
    const [visibleViewTicket, setVisibleViewTicket] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [seeAll, setSeeAll] = useState(false);
    const [activeTab, setActiveTab] = useState(Recommended);
    const [refreshing, setRefreshing] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const { getByUserId } = useBooking();
    const { user } = useUser();
    const { hotels, getAllHandler, clearError } = useHotel();
    const [hotelsData, setHotelsData] = useState(hotels || []);
    const [auth, setAuth] = usePersistedState(authKey, {
        user: null,
        accessToken: null,
    });

    const [bookingsData, setBookingsData] = useState([]);

    const tabBarHeight = useBottomTabBarHeight();

    const fetchingBookings = useCallback(async () => {
        clearError();

        if (!!auth) {
            await getByUserId(auth.user.id, auth.accessToken)
                .then((bookings) => {
                    setBookingsData(!!bookings ? bookings.filter((b) => b?.state === Ongoing) : []);

                    setRefreshing(false);
                })
                .catch((err) => {
                    console.error('Error fetching bookings:', err);
                    setRefreshing(false);
                });
        }
    }, [auth.user, auth.accessToken, getByUserId]);

    const filteredBookings = useMemo(() => {
        const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;

        return bookingsData && bookingsData
            .filter((booked) => booked.id !== 0 &&
                (
                    (seeAll || booked.created > threeDaysAgo) &&
                    (
                        (!searchInput || getSearchFieldByName(booked?.name, searchInput)) ||
                        (!searchInput || getSearchFieldByName(booked?.country_code, searchInput)) ||
                        (!searchInput || getSearchFieldByName(booked?.city, searchInput)) ||
                        (!searchInput || getSearchFieldByName(booked?.kind, searchInput)) ||
                        (!searchInput || getSearchFieldByName(booked?.occupancy, searchInput))
                    )
                ));
    }, [bookingsData, seeAll, searchInput]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);

        if (auth?.user) {
            await fetchingBookings();
        }

        if (hotels?.length > 0) {
            setHotelsData(hotels);
        } else {
            const result = await getAllHandler();

            if (result?.valid !== false) {
                setHotelsData(result);
            }

            setRefreshing(false);
        }

        if (auth?.user) {
            setAuth((prevAuth) => ({
                ...prevAuth,
                user: {
                    ...prevAuth.user,
                    name: user?.name ?? prevAuth.user.name,
                    phone: user?.phone ?? prevAuth.user.phone,
                },
            }));
        }

    }, [auth, fetchingBookings, hotels]);

    useEffect(() => {
        setHotelsData(hotels);
    }, [hotels]);

    useEffect(() => {
        if (auth?.user) {
            fetchingBookings();
        }
    }, [auth]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (auth?.user) {
                fetchingBookings();
            }
        });

        return unsubscribe;
    }, [navigation, auth, fetchingBookings]);

    const loadHotelHandler = (hotel) => {
        navigation.navigate('Hotel', {
            ...hotel, auth,
        });
    }

    const tabPressHandler = (tab) => {
        setActiveTab(tab);
    };

    const recentBookingHandler = (ongoing) => {
        setVisibleViewTicket(true);
        setCurrentBooking({
            ...ongoing,
            qrCOdeValue: ongoing.name,
            resourceTypeName: `${ongoing.name ?? ''}\n${ongoing.kind ?? ''}`,
            occupancy: `${ongoing.guests ?? ''}`,
            userFullname: `${auth?.user?.name ?? ''}`,
            userPhone: `${auth?.user?.phone ?? ''}`,
        });
    }

    const onCloseViewTicket = () => {
        setVisibleViewTicket(false);
        setCurrentBooking(null);
    }

    return (
        <ScrollView
            style={{ paddingBottom: tabBarHeight }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {/* --- Welcome Text --- for authenticate user*/}
            {auth?.user?.status === Authorised && (
                <View style={[styles.sectionHeader, { justifyContent: 'flex-start', padding: 10, marginBottom: 10 }]}>
                    <Text style={[styles.sectionTitle, { fontSize: 28 }]}>Hello, {auth.user.name}{'  '}</Text>
                    <Image source={ImagesAssets.waving_hand_light} style={{ width: 40, height: 40 }} />
                </View>
            )}

            {/* Search */}
            <Search
                input={searchInput}
                setInput={setSearchInput}
            />

            {/* --- Categories --- */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
            >
                {categories.map((cat, index) => (
                    <Tab
                        key={cat}
                        style={{ ...styles }}
                        activeTab={activeTab}
                        tabPressHandler={tabPressHandler}
                        tab={cat}
                    />
                ))}
            </ScrollView>

            {/* --- Featured Card (Emeralda De Hotel) --- */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.featuredScroll}
            >
                
                {hotelsData && hotelsData.length > 0
                    ? hotelsData
                        .filter((h) => h.id !== 0 && (activeTab === Recommended || h.category === activeTab))
                        .slice(0, 30)
                        .map((hotel) => (
                            <HotelCard
                                key={hotel.id}
                                imageUrl={hotel.image_url}
                                rating={hotel.ratings}
                                name={hotel.name}
                                city={hotel.city}
                                country={hotel.country_code}
                                price={hotel.price_per_night}
                                kind={PerNight}
                                feature={true}
                                onPress={() => loadHotelHandler(hotel)}
                            />
                        ))
                    : <Empty />}
            </ScrollView>

            {/* --- Ticket Modal --- */}
            {visibleViewTicket && currentBooking && (
                <TicketModal
                    bookingItem={currentBooking}
                    isVisible={visibleViewTicket}
                    onCloseViewTicket={onCloseViewTicket}
                />
            )}

            {/* --- Recently Booked Section --- */}
            {(auth?.user?.status === Authorised && (
                <ScrollView>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recently Booked</Text>
                        <TouchableOpacity onPress={() => { setSeeAll(true) }}>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {filteredBookings && filteredBookings.map((ongoing) => (
                        <HotelCard
                            key={ongoing.created}
                            name={ongoing.name}
                            imageUrl={ongoing.imageUrl}
                            city={ongoing.city}
                            country={ongoing.country}
                            price={ongoing.price}
                            rating="4.8"
                            reviews={randomGenerateDigits()}
                            booked={ongoing.state === Ongoing}
                            onPress={() => { recentBookingHandler(ongoing) }}
                        />
                    ))}
                </ScrollView>
            )) || (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            Logined in users see their bookings
                        </Text>
                    </View>
                )}
        </ScrollView>
    );
}
