import {getRandomValue} from './utils.js';

const OFFERTYPEVALUES = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"];

export const generateOffer = () => (
  {
      type: getRandomValue(OFFERTYPEVALUES),
      offers: [
        {
          id: 1,
          title: 'Upgrade to a business class',
          price: 120
        }, 
        {
          id: 2,
          title: 'Choose the radio station',
          price: 60
        }
      ]
   });
/*for(const element of generateOffer().offers) {
  console.log(element.title)
};*/