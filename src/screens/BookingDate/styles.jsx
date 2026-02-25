import { StyleSheet } from 'react-native'

import { defaultTheme } from '../../helpers/styleHelper';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultTheme.white
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 15
    },
    scrollContent: {
        paddingHorizontal: 20
    },

    // Calendar Card
    calendarCard: {
        backgroundColor: '#F8FEFA',
        borderRadius: 20,
        padding: 10,
        marginBottom: 10
    },
    calendarTheme: {
        todayTextColor: defaultTheme.primaryColor,
        arrowColor: defaultTheme.primaryColor,
        monthTextColor: '#212121',
        textMonthFontWeight: 'bold',
    },
    // Date and Counter
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: defaultTheme.white,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 20,
        padding: 15
    },
    counterBtn: {
        backgroundColor: '#E8F8EF',
        padding: 10,
        borderRadius: 12
    },
    counterText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 30
    },

    // Buttons
    payBtn: {
        backgroundColor: defaultTheme.primaryColor,
        borderRadius: 30,
        height: 58,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.8,
    },
    viewTicketBtn: {
        backgroundColor: defaultTheme.primaryColor,
        borderRadius: 30,
        width: '100%',
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 15
    },
    payBtnText: {
        color: defaultTheme.white,
        fontSize: 18,
        fontWeight: 'bold'
    },
    footer: {
        borderTopWidth: 1,
        borderColor: '#EEEEEE',
        padding: 0,
        bottom: '1%',
        // width: '100%',
        // position: 'absolute',
        // backgroundColor: defaultTheme.white,
        // paddingVertical: 20,
        marginHorizontal: 24,
        alignItems: 'center'
    },
    totalText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    }
});