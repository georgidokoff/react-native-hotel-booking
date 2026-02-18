import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, datedi } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

import { defaultTheme } from '../../helpers/styleHelper';
import { styles } from './styles'

export default function BookingDateScreen({ navigation, route }) {
    const [guests, setGuests] = useState(3);
    console.log(route);

    const DateDisplay = ({ label, date }) => (
        <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>{label}</Text>
            <View style={styles.dateValueContainer}>
                <Text style={styles.dateValueText}>{date}</Text>
                <Ionicons name="calendar-outline" size={20} color="#212121" />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Custom Styled Calendar */}
                <View style={styles.calendarCard}>
                    <Calendar
                        current={'2024-12-01'}
                        markingType={'period'}
                        markedDates={{
                            '2024-12-16': { startingDay: true, color: '#1AB65C', textColor: 'white' },
                            '2024-12-17': { color: '#E8F8EF', textColor: '#1AB65C' },
                            '2024-12-18': { color: '#E8F8EF', textColor: '#1AB65C' },
                            '2024-12-19': { color: '#E8F8EF', textColor: '#1AB65C' },
                            '2024-12-20': { endingDay: true, color: '#1AB65C', textColor: 'white' },
                        }}
                        theme={{
                            todayTextColor: '#1AB65C',
                            arrowColor: '#1AB65C',
                            monthTextColor: '#212121',
                            textMonthFontWeight: 'bold',
                        }}
                    />
                </View>

                {/* Check-in/out Display */}
                <View style={styles.dateRow}>
                    <DateDisplay label="Check in" date="Dec 16" />
                    <Ionicons name="arrow-forward" size={20} color="#212121" style={{ marginTop: 25 }} />
                    <DateDisplay label="Check out" date="Dec 20" />
                </View>

                {/* Guest Counter */}
                <Text style={styles.sectionTitle}>Guest</Text>
                <View style={styles.counterContainer}>
                    <TouchableOpacity onPress={() => setGuests(Math.max(1, guests - 1))} style={styles.counterBtn}>
                        <Ionicons name="remove" size={24} color={defaultTheme.primaryColor} />
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{guests}</Text>
                    <TouchableOpacity onPress={() => setGuests(guests + 1)} style={styles.counterBtn}>
                        <Ionicons name="add" size={24} color={defaultTheme.primaryColor} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: $435</Text>
                <TouchableOpacity style={styles.continueBtn}>
                    <Text style={styles.continueBtnText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};