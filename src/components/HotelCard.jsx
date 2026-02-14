import { Text, View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles'

export default function HotelCard({
    name,
    city,
    country,
    location,
    price,
    imageUrl,
    rating,
    reviews,
    booked
}) {
    return (
        <View style={styles.listItem}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.listImage}
            />
            <View style={styles.listContent}>
                <Text style={styles.listName}>{name}</Text>
                <Text style={styles.listLocation}>{country}, {city}</Text>
                <View style={styles.listRatingRow}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.listRatingText}>{rating} <Text style={styles.reviewText}>({reviews} reviews)</Text></Text>
                </View>
            </View>
            <View style={styles.listPriceInfo}>
                <Text style={styles.listPrice}>€ {price}</Text>
                <Text style={styles.perNightSmall}>/ night</Text>
                <Ionicons name="bookmark" size={20} color={booked ? "#1AB65C" : "#9E9E9E"} style={{ marginTop: 5 }} />
            </View>
        </View>
    )
};