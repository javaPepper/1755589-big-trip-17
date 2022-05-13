import TripEventEditView from '../view/trip-event-edit-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripFiltersView from '../view/trip-filter-view.js';
import PointsView from '../view/point-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import {render} from '../render.js';

export default class TripPresenter {

  init = (pointsModel, destinationModel, offerModel) => { 

    // ------------- точки маршрута -------------
    this.pointsModel = pointsModel;
    this.points = [...this.pointsModel.getPoints()];

    // ------------ destination точки -----------
    this.destinationModel = destinationModel;
    this.destination = this.destinationModel.getDestination();

    // ------------- тип оффера точки ----------
    this.offerModel = offerModel;
    this.offer = this.offerModel.getOffer();

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
    render(new TripEventEditView(this.destination, this.offer), listContainer);

    // -------------Отрисовка точки маршрута ---------------
    for (let i = 0; i < this.points.length; i++) {
    render(new PointsView(this.points[i]), listContainer);
   }
  };
}
