export const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomGenerateReviews = () => {
  return getRandomInteger(500, 700);
}

export const tabs = ["Ongoing", "Completed", "Canceled"];

export const categories = ["Recommended", "Popular", "Trending", "Luxury"];