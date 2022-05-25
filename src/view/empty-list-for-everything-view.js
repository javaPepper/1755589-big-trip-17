import {createElement} from '../render.js';

export default class EmptyListForEverything {

  constructor (message) {
    this.message = message;
  }

  get template() {
    return `<p class="trip-events__msg">${this.message}</p>`;
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
