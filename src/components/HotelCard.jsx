import { Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { EUR } from '../shared/constants'

import { styles } from './styles'
import { defaultTheme } from "../helpers/styleHelper";

export default function HotelCard({
    name,
    city,
    country,
    location,
    price,
    imageUrl,
    rating,
    reviews,
    booked,
    feature,
    kind,
    style,
    onPress
}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[feature ? styles.featuredCard : styles.listItem, { ...style }]}>
                <Image
                    source={{ uri: imageUrl }}
                    style={[feature ? styles.featuredImage : styles.listImage, { ...style }]}
                />
                {
                    feature &&
                    <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color={defaultTheme.white} />
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                }
                <View style={[feature ? styles.featuredOverlay : styles.listContent, { ...style }]}>
                    <Text style={[feature ? styles.featuredName : styles.listName, { ...style }]}>{name}</Text>
                    <Text style={[feature ? styles.featuredLocation : styles.listLocation, , { ...style }]}>{country}, {city}</Text>
                    {!feature &&
                        <View style={[styles.listRatingRow, { ...style }]}>
                            <Ionicons name="star" size={14} color={defaultTheme.rating} />
                            <Text style={[styles.listRatingText, { ...style }]}>{rating}
                                <Text style={[styles.reviewText, { ...style }]}>({reviews} reviews)
                                </Text>
                            </Text>
                        </View>}
                    {feature &&
                        <View style={styles.priceRow}>
                            <Text style={styles.featuredPrice}>{EUR} {price}
                                <Text style={styles.perNight}>{kind}
                                </Text>
                            </Text>
                            <Ionicons name="bookmark-outline" size={28} color={defaultTheme.white} />
                        </View>}
                </View>
                {
                    !feature &&
                    <View style={[styles.listPriceInfo, { ...style }]}>
                        <Text style={[styles.listPrice, { ...style }]}>{EUR} {price}</Text>
                        <Text style={[styles.perNightSmall, { ...style }]}>{kind}</Text>
                        <Ionicons name="bookmark" size={20} color={booked ? defaultTheme.primaryColor : defaultTheme.greyColor} style={{ marginTop: 5 }} />
                    </View>}
            </View>
        </TouchableOpacity>
    )
};