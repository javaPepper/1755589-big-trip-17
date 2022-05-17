import {generateOffer} from '../mock/offer.js';

export default class OfferModel {
  #offer = generateOffer();

  get offer () {
    return this.#offer;
  }
}
