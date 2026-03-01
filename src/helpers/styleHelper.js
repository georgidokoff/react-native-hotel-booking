export const getStatusColor = (status) => {
    switch (status) {
        case "Ongoing":
            return {
                bg: "#FFF3CD", text: "#856404"
            };
        case "Completed":
            return {
                bg: "#D4EDDA", text: "#155724"
            };
        case "Cancelled":
            return {
                bg: "#F8D7DA", text: "#721C24"
            };
        default:
            return {
                bg: "#E2E3E5", text: "#383D41"
            };
    }
};

export const getStatusStyles = (status) => {
    const badgePaid = {
        backgroundColor: '#E8F8EF',
        color: '#1AB65C'
    };
    const badgeCompleted = {
        backgroundColor: '#E8F8EF',
        color: '#1AB65C'
    };
    const badgeCanceled = {
        backgroundColor: '#FFEBEE',
        color: '#F44336'
    };

    switch (status) {
        case "Paid":
            return badgePaid;
        case "Completed":
            return badgeCompleted;
        case "Canceled & Refunded":
            return badgeCanceled;
        default:
            return badgePaid;
    }
};

export const defaultTheme = {
    primaryColor: "#1AB65C",
    greyColor: "#9E9E9E",
    black: "#000",
    white: "#fff",
    rating: "#FFD700",
    faceBookColor: "#1877F2",
    backgroundColor: '#e0e7ff',
    camera: {
        flex: 1,
        container: {},
        editButton: {
            position: "absolute",
            top: 0,
            left: 20,
            // left: 0,
            backgroundColor: "#1AB65C",
            padding: 6,
            borderRadius: 8,
        },
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            backgroundColor: "#000",
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: 12,
        },
        buttonText: {
            fontSize: 16,
            fontWeight: '600',
            color: "#1AB65C",
        },
        permissionText: {
            fontSize: 14,
            color: "#9E9E9E",
            textAlign: 'center',
        },
        modalContainer: {
            flex: 1,
            backgroundColor: "#000",
        },
        controls: {
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'space-between',
        },
    }
}