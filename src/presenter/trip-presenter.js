import NewTripEventView from '../view/new-trip-event-view.js';
import TripEventEditView from '../view/trip-event-edit-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripFiltersView from '../view/trip-filter-view.js';
import DestinationView from '../view/destination-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import {render} from '../render.js';

const ITEMQUANTITY = 3;

export default class TripPresenter {

  init = () => {
  // ------------ Отрисовка фильтров --------------
    const siteHeaderElement = document.querySelector('.trip-main');
    const tripControls = siteHeaderElement.querySelector('.trip-main__trip-controls');
    render(new TripFiltersView(), tripControls);

    // ------------ Отрисовка сортировки ----------
    const tripEvents = document.querySelector('.trip-events');
    render(new TripSortView(), tripEvents);

    // -------------Отрисовка контейнера форм создания и редактирования -------
    render(new TripEventsListView(), tripEvents);

    // --------------Отрисовка формы редактироввания --------
    const listContainer = tripEvents.querySelector('.trip-events__list');
    render(new TripEventEditView(), listContainer);

    // ------------- Отрисовка формы создания ----------
    render(new NewTripEventView(), listContainer);

    // -------------Отрисовка точки маршрута ---------------
    for (let i = 0; i < ITEMQUANTITY; i++) {
      render(new DestinationView(), listContainer);
    }
  };
}
