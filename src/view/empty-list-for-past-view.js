import {createElement} from '../render.js';

export default class EmptyListForPast {

  get template() {
    return '<p class="trip-events__msg">There are no past events now</p>';
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
