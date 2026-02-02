import { FlatList, Text, View } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import Search from "../../components/Search";
import HotelCard from "../../components/HotelCard";

import { HotelsData } from '../../temp/data'

import { styles } from './styles';

export default function SearchScreen() {
    const [hotels, setHotels] = useState([
        {
            id: 0,
            name: '',
            location: '',
            city: '',
            country: '',
            rating: 0.0,
            reviews: 0,
            price: 0,
            imageUrl: '',
            base64: '',
            category: ''
        }
    ]);
    const buttomTabHeight = (2 * (Math.round(useBottomTabBarHeight()?.toFixed(2) ?? 0) + 3));

    const categories = ['Recommended', 'Popular', 'Trending', 'Luxury'];

    useEffect(() => {
        setHotels(HotelsData);
    }, [])
    
    return (
        <View>
            <Search />

            <View style={[{ ...styles }, { marginBottom: buttomTabHeight }]}>
                <FlatList
                    data={hotels.filter(h => h.id !== 0)}
                    renderItem={({ item }) =>
                        <HotelCard
                            name={item.name}
                            imageUrl={item.base64 ? item.base64 : item.imageUrl}
                            city={item.city}
                            country={item.country}
                            price={item.price}
                            rating={item.rating}
                            reviews={item.reviews}
                            booked={false}
                        />}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>);
}