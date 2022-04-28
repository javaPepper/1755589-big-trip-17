import {createElement} from '../render.js';

export default class DestinationView {
  getTemplate() {
    return '<li class="trip-events__item"></li>';
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
