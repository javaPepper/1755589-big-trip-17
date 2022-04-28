import NewTripEventView from './view/new-trip-event-view.js';
import TripEventEditView from './view/trip-event-edit-view.js';
import TripSortView from './view/trip-sort-view.js';
import TripFiltersView from './view/trip-filter-view.js';
import DestinationView from './view/destination-view.js';
import {render} from './render.js';

// ------------ Отрисовка фильтров --------------
const siteHeaderElement = document.querySelector('.trip-main');
const tripControls = siteHeaderElement.querySelector('.trip-main__trip-controls');
render(new TripFiltersView(), tripControls);

// ------------ Отрисовка сортировки ----------
const tripEvents = document.querySelector('.trip-events');
render(new TripSortView(), tripEvents);

// --------------Отрисовка формы редактироввания --------
const pageBody = document.querySelector('.page-body__page-main');
const pageBodyContainer = pageBody.querySelector('.page-body__container');
const tripEventsList = document.createElement('ul');
const eventList = pageBodyContainer.appendChild(tripEventsList);
eventList.classList.add('trip-events__list');
render(new TripEventEditView(), eventList);

// ------------- Отрисовка формы создания ----------
render(new NewTripEventView(), eventList);

// -------------Отрисовка точки маршрута ---------------
render(new DestinationView(), eventList);
