import {createElement} from '../render.js';

export default class EmptyListForEverything {

  get template() {
    return '<p class="trip-events__msg">Click New Event to create your first point</p>';
  }

  getElement() {
    if (!this.elem) {
      this.elem = createElement(this.template);
    }

    return this.elem;
  }

  removeElement() {
    this.elem = null;
  }
}
