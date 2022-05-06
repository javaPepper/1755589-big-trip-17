import {getRandomValue} from './utils.js';

const pointTypeValues = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const generatePoint = () => (
  {
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    //destination: $Destination$,
    id: '0',
    isFavorite: false,
    //offers: $Array<Offer>$,
    type: getRandomValue(0, pointTypeValues.length - 1)
  }
);
