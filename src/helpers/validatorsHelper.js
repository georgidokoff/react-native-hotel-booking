import { OK, NOK } from '../shared/constants';

export const validate = (input, type) => {
    if (!input) {
        return {
            valid: false,
            message: `${type} is required`
        };
    }

    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(input) ? OK : { valid: false, message: `${type} is invalid` };
        case 'password':
            return input.length >= 4 ? OK : { valid: false, message: `${type} must be at least 4 characters` };
        case 'name':
            return input.trim().length > 1 ? OK : { valid: false, message: `${type} must be at least 2 characters` };
        case 'phone':
            const phoneRegex = /^(?:\+359|00359|0)\d{9}$/;
            return phoneRegex.test(input) ? OK : { valid: false, message: `${type} is invalid` };
        default:
            return NOK;
    }
}   