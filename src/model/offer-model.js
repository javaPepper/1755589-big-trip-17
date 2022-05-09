import {generateOffer} from '../mock/offer.js';

export default class OfferModel {
  offer = generateOffer();

  getOffer = () => this.offer;
}
