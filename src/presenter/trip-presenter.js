import TripSortView from '../view/trip-sort-view.js';
import TripFiltersView from '../view/trip-filter-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EmptyListForEverything from '../view/empty-list-for-everything-view.js';
import PointPresenter from '../presenter/point-presenter.js';
import {updateItem} from '../mock/utils.js';
import {render} from '../framework/render.js';
//import { sortPoints } from '../mock/point.js';
import { SortType } from '../mock/const.js';

export default class TripPresenter {

  tripEvents = document.querySelector('.trip-events');
  //points = [];
  sourcedPoints = [];
  #pointPresenter = new Map();
  sortComponent = new TripSortView();
  currentSortType = SortType.DEFAULT;

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

  handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  renderFilters = () => {
    const siteHeaderElement = document.querySelector('.trip-main');
    const tripControls = siteHeaderElement.querySelector('.trip-main__trip-controls');
    render(new TripFiltersView(), tripControls);
  };

  sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.PRICE:
        this.points.slice().sort((a, b) => b.basePrice - a.basePrice);
        break;
      case SortType.TIME:
        this.points.slice().sort((a, b) => b.dateFrom - a.dateFrom);
        break;
      default:
        this.points = [...this.sourcedPoints];
    }

    this.currentSortType = sortType;
  };

  handleSortTypeChange = (sortType) => {
    if (this.currentSortType === sortType) {
      return;
    }
    this.removePoints();
    this.sortPoints(sortType);
    this.renderPoints();
  };

  renderSort = () => {
    render(this.sortComponent, this.tripEvents);
    this.sortComponent.setSortTypeChangeHandler(this.handleSortTypeChange);
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
    const pointPresenter = new PointPresenter(this.destination, this.offer, this.handlePointChange, this.handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  removePoints = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
  };
}
