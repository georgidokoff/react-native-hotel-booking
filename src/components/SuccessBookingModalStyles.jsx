import { StyleSheet } from 'react-native'

import { defaultTheme } from '../helpers/styleHelper';

export const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 30
    },
    modalContainer: {
        backgroundColor: defaultTheme.white,
        borderRadius: 40,
        padding: 30,
        height: '55%',
        alignItems: 'center'
    },
    successCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E8F8EF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25
    },
    innerCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: defaultTheme.primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalHeader: {
        color: defaultTheme.primaryColor,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15
    },
    textHeader:{
        alignItems: 'center',
    },
    modalSubtext: {
        textAlign: 'center',
        color: '#616161',
        fontSize: 16,
        marginBottom: 30
    },
    viewTicketBtn: {
        backgroundColor: defaultTheme.primaryColor,
        paddingVertical: 18,
        borderRadius: 35,
        alignItems: "center",
        marginBottom: 16,
    },
    whiteText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    closeLink: {
        backgroundColor: '#defee7ff',
        paddingVertical: 18,
        borderRadius: 35,
        alignItems: "center",
        marginBottom: 16,
    },
    greenLinkText: {
        color: defaultTheme.primaryColor,
        fontSize: 18,
        fontWeight: "bold"
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 20,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
});