import { Canceled, Completed, Ongoing, Recommended, Popular, Trending, Luxury } from "../shared/constants";

export const getRandomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomGenerateDigits = (min = 500, max = 700) => {
    return getRandomInteger(min, max);
}

export const getDate = (days) => {
    const date = new Date();

    if (days !== undefined && days !== null) {
        date.setDate(date.getDate() + days);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`; // new Date(year, date.getMonth() + 1, date.getDate());
};

export const getSearchFieldByName = (name, input) => {
    return String(name)?.toLocaleLowerCase()?.includes(input?.toLocaleLowerCase())
}

export const setDefaultRefresh = (setRefreshing) => {
    return setRefreshing(false);
}

export const tabs = [Ongoing, Completed, Canceled];

export const categories = [Recommended, Popular, Trending, Luxury];