import { StyleSheet } from 'react-native'
import { defaultTheme } from '../../helpers/styleHelper';

export const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: defaultTheme.white},
    heroContainer: { 
        height: 350, 
        position: 'relative' },
    mainImage: { 
        width: '100%', 
        height: '100%' },
    heroHeader: {
        position: 'absolute', 
        top: 50, 
        left: 20, 
        right: 20,
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    rightIcons: { 
        flexDirection: 'row', 
        gap: 15 },
    iconCircle: { 
        padding: 8, 
        borderRadius: 20, 
        backgroundColor: 'rgba(0,0,0,0.2)' },

    // Details Section
    detailsContent: { 
        padding: 24, 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30, 
        marginTop: -30, 
        backgroundColor: defaultTheme.white },
    hotelName: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        color: '#212121', 
        marginBottom: 12 },
    locationRow: { 
        flexDirection: 'row', 
        alignItems: 'center',
         marginBottom: 20 },
    locationText: { 
        color: '#616161', 
        marginLeft: 6, 
        fontSize: 14, 
        flex: 1 },
    divider: { 
        height: 1, 
        backgroundColor: '#EEEEEE', 
        marginVertical: 10 },

    // Gallery
    sectionHeader: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 15 },
    sectionTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginVertical: 15 },
    seeAllText: { 
        color: defaultTheme.primaryColor,
         fontWeight: 'bold' },
    galleryItem: { 
        width: 140, 
        height: 100, 
        borderRadius: 20, 
        marginRight: 15 },

    // Icon Grid
    iconGrid: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 20 },
    detailItem: { 
        alignItems: 'center' },
    detailLabel: { 
        fontSize: 12, 
        color: '#616161', 
        marginTop: 8 },

    // Footer
    footer: {
        flexDirection: 'row', padding: 24, alignItems: 'center',
        borderTopWidth: 1, borderColor: '#F5F5F5', backgroundColor: '#fff'
    },
    priceRow: { flexDirection: 'row', alignItems: 'baseline', flex: 1 },
    priceAmount: { fontSize: 24, fontWeight: 'bold', color: defaultTheme.primaryColor },
    priceUnit: { fontSize: 14, color: '#616161' },
    bookBtn: {
        backgroundColor: defaultTheme.primaryColor, paddingHorizontal: 40, paddingVertical: 18,
        borderRadius: 30, elevation: 8, shadowColor: defaultTheme.primaryColor, shadowOpacity: 0.3
    },
    bookBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});