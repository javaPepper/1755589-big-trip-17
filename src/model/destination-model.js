import {generateDestination} from '../mock/destination.js';

export default class DestinationModel {
  #destination =  generateDestination();

  get destination () {
    return this.#destination;

  }
}
