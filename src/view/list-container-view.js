import AbstractView from '../framework/view/abstract-view.js';

export default class ListContainerView extends AbstractView {
  get template() {
    return '<ul class="trip-events__list"></ul>';
  }
}
