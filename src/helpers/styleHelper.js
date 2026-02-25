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
    white: "#fff",
    rating: "#FFD700",
    faceBookColor: "#1877F2",
}