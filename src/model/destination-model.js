import {generateDestination} from '../mock/destination.js';

export default class DestinationModel {
  destination =  generateDestination();
  
  getDestination = () => this.destination;
}
