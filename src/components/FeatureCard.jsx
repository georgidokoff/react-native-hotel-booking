import { Text, View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles'

export default function FeatureCard({
    imageUrl,
    rating,
    name,
    city,
    country,
    price,
    kind
}) {
    return (<View style={styles.featuredCard}>
        <Image
            source={{ uri: imageUrl }}
            style={styles.featuredImage}
        />
        <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#fff" />
            <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <View style={styles.featuredOverlay}>
            <Text style={styles.featuredName}>{name}</Text>
            <Text style={styles.featuredLocation}>{city}, {country}</Text>
            <View style={styles.priceRow}>
                <Text style={styles.featuredPrice}>${price}
                    <Text style={styles.perNight}>{kind}
                    </Text>
                </Text>
                <Ionicons name="bookmark-outline" size={28} color="#fff" />
            </View>
        </View>
    </View>)
}