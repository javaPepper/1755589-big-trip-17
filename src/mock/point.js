import {getRandomValue} from './utils.js';
import {generateDestination} from './destination.js';
import {generateOffer} from './offer.js';
import { tripDate } from './utils.js';

const PRICEVALUES = [100, 300, 506, 800, 900, 990, 1100, 1500, 1700, 2000];
const TYPEVALUES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const generatePoint = () => (
  {
    basePrice: getRandomValue(PRICEVALUES),
    dateFrom: tripDate('2019-07-10T22:55:56.845Z'),
    dateTo: tripDate('2019-07-11T11:22:13.375Z'),
    destination: generateDestination(),
    id: getRandomValue(['0', '1', '2']),
    isFavorite: false, // На этапе создания это значение - false, при редактировании это значение будет выбрано пользователем.
    offers: generateOffer(),
    type: getRandomValue(TYPEVALUES)
  }
);

