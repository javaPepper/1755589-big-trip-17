import {getRandomValue} from './utils.js';
import {generateDestination} from './destination.js';
import {generateOffer} from './offer.js';
import {nanoid} from 'nanoid';
import { tripDate } from './utils.js';

const PRICEVALUES = [100, 300, 506, 800, 900, 990, 1100, 1500, 1700, 2000];
const TYPEVALUES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DAYSVALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

export const generatePoint = () => (
  {
    basePrice: getRandomValue(PRICEVALUES),
    dateFrom: tripDate(`2019-07-${getRandomValue(DAYSVALUES)}T22:55:56`),
    dateTo: tripDate(`2019-07-${getRandomValue(DAYSVALUES)}T11:22:13.375Z`),
    destination: generateDestination(),
    id: nanoid(),
    isFavorite: Boolean(getRandomValue(0, 1)),
    offers: generateOffer(),
    type: getRandomValue(TYPEVALUES)
  }
);

const sortPoints = (a, b) => {
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
  }
  return 0;
};

export {sortPoints};
