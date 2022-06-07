import TripSortView from '../view/trip-sort-view.js';
import TripFiltersView from '../view/trip-filter-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EmptyListForEverything from '../view/empty-list-for-everything-view.js';
import PointPresenter from '../presenter/point-presenter.js';
import {updateItem} from '../mock/utils.js';
import {render} from '../framework/render.js';

export default class TripPresenter {

  tripEvents = document.querySelector('.trip-events');
  points = [];
  sourcedPoints = [];
  #pointPresenter = new Map();

  init = (pointsModel, destinationModel, offerModel) => {

    // ------------- точки маршрута -------------
    this.pointsModel = pointsModel;
    this.points = [...this.pointsModel.points];
    this.sourcedPoints = [...this.pointsModel.points];

    // ------------ destination точки -----------
    this.destinationModel = destinationModel;
    this.destination = this.destinationModel.destination;

    // ------------- тип оффера точки ----------
    this.offerModel = offerModel;
    this.offer = this.offerModel.offer;

    // ------------ Отрисовка фильтров --------------
    this.renderFilters();

    // ------------ Отрисовка сортировки ----------
    this.renderSort();

    // ------------- Отрисовка контейнера  -------
    this.renderContainer();

    // -------------Отрисовка точки маршрута ---------------
    this.renderPoints();
  };

  handlePointChange = (updatedPoint) => {
    this.points = updateItem(this.points, updatedPoint);
    this.sourcedPoints = updateItem(this.sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  renderFilters = () => {
    const siteHeaderElement = document.querySelector('.trip-main');
    const tripControls = siteHeaderElement.querySelector('.trip-main__trip-controls');
    render(new TripFiltersView(), tripControls);
  };

  renderSort = () => {
    render(new TripSortView(), this.tripEvents);
  };

  renderContainer = () => {
    render(new TripEventsListView(), this.tripEvents);
  };

  renderPoints = () => {
    // ------------- Отрисовка сообщения при отсутствии точек -----------
    if (this.points.length === 0) {
      render(new EmptyListForEverything('Click New Event to create your first point'));
    }
    else {
      for (let i = 0; i < this.points.length; i++) {
        this.renderPoint(this.points[i]);
      }
    }
  };

  renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.destination, this.offer, this.handlePointChange);
    pointPresenter.init(point);
  };
}
