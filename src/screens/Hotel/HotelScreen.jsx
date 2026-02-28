import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EUR, Guest, PerNightSearch } from '../../shared/constants';
import { randomGenerateDigits } from '../../helpers/commonHelper';

import { defaultTheme } from '../../helpers/styleHelper';
import { styles } from './styles'

const DetailIcon = ({ name, label, color }) => (
    <View style={styles.detailItem}>
        <MaterialCommunityIcons name={name} size={28} color={color} />
        <Text style={styles.detailLabel}>{label}</Text>
    </View>
);

export default function HotelScreen({ navigation, route }) {
    const [hotel] = useState(route.params || {})
    const [auth] = useState(route.params?.auth || null);
    const [isGuest] = useState(!auth || route.params?.auth?.user?.status === Guest);

    const bookNowHandler = async () => {
        navigation.navigate('BookingDate', {
            ...hotel
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Image Section */}
                <View style={styles.heroContainer}>
                    <Image
                        source={{ uri: hotel.image_url }}
                        style={styles.mainImage}
                    />

                    {/* Pagination Dots */}
                    <View style={styles.paginationRow}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} /><View style={styles.dot} /><View style={styles.dot} />
                    </View>
                </View>

                <View style={styles.detailsContent}>
                    <Text style={styles.hotelName}>{hotel.name}</Text>
                    <View style={styles.locationRow}>
                        <Ionicons name="location" size={18} color={defaultTheme.primaryColor} />
                        <Text style={styles.locationText}>{hotel.location}</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Gallery Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Gallery Photos</Text>
                        {/* Implement load all images */}
                        {/* <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                    {!!hotel?.gallery &&
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
                            {String(hotel.gallery ?? '').split(' ')?.map((image_url, index) =>
                                <Image
                                    key={index}
                                    source={{ uri: image_url }}
                                    style={styles.galleryItem}
                                />
                            )}
                        </ScrollView>
                    }

                    {/* Details Icons */}
                    <Text style={styles.sectionTitle}>Details</Text>
                    <View style={styles.iconGrid}>
                        <DetailIcon name="office-building" label="Hotels" color={defaultTheme.primaryColor} />
                        <DetailIcon name="bed-outline" label={`${randomGenerateDigits(1, 5)} Bedrooms`} color={defaultTheme.primaryColor} />
                        <DetailIcon name="bathtub-outline" label={`${randomGenerateDigits(1, 3)} Bathrooms`} color={defaultTheme.primaryColor} />
                        <DetailIcon name="arrow-expand-all" label={`${randomGenerateDigits(2000, 5000)} sqft`} color={defaultTheme.primaryColor} />
                    </View>

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                        {hotel.description}
                    </Text>
                </View>
            </ScrollView>

            {/* Booking Footer */}
            <SafeAreaView style={styles.footer}>
                <View style={styles.priceRow}>
                    <Text style={styles.priceAmount}>{EUR}{' '}{hotel.price_per_night}</Text>
                    <Text style={styles.priceUnit}>{' '}{PerNightSearch}</Text>
                </View>
                <TouchableOpacity
                    disabled={isGuest}
                    style={[styles.bookBtn, isGuest && styles.disabledBookBtnText]}
                    onPress={bookNowHandler}>
                    <Text style={styles.bookBtnText}>Book Now!</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};
