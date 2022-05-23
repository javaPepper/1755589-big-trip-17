import TripEventEditView from '../view/trip-event-edit-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripFiltersView from '../view/trip-filter-view.js';
import PointsView from '../view/point-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EmptyListForEverything from '../view/empty-list-for-everything-view.js';
import EmptyListForFuture from '../view/empty-list-for-future-view.js';
import EmptyListForPast from '../view/empty-list-for-past-view.js';
import {render} from '../render.js';

export default class TripPresenter {

  init = (pointsModel, destinationModel, offerModel) => {

    // ------------- точки маршрута -------------
    this.pointsModel = pointsModel;
    this.points = [...this.pointsModel.points];

    // ------------ destination точки -----------
    this.destinationModel = destinationModel;
    this.destination = this.destinationModel.destination;

    // ------------- тип оффера точки ----------
    this.offerModel = offerModel;
    this.offer = this.offerModel.offer;

    // ------------ Отрисовка фильтров --------------
    const siteHeaderElement = document.querySelector('.trip-main');
    const tripControls = siteHeaderElement.querySelector('.trip-main__trip-controls');
    render(new TripFiltersView(), tripControls);

    // ------------ Отрисовка сортировки ----------
    const tripEvents = document.querySelector('.trip-events');
    render(new TripSortView(), tripEvents);

    // ------------- Отрисовка контейнера  -------
    render(new TripEventsListView(), tripEvents);

    // ------------ Отрисовка сообщений list-empty ----------
    const listEverything = new TripFiltersView().getElement().querySelector('#filter-everything');
    const listFuture = new TripFiltersView().getElement().querySelector('#filter-future');
    const listPast = new TripFiltersView().getElement().querySelector('#filter-past');
    window.addEventListener('load', () => {
      tripControls.querySelector('.trip-filters').addEventListener('click', (evt) => {
        if (evt.target === listEverything && (this.points === undefined || this.points === null)) {
          render(new EmptyListForEverything(), tripEvents);
        }
        if (evt.target === listFuture && (this.points === undefined || this.points === null)) {
          render(new EmptyListForFuture(), tripEvents);
        }
        if (evt.target === listPast && (this.points === undefined || this.points === null)) {
          render(new EmptyListForPast(), tripEvents);
        }
      });
    });

    // -------------Отрисовка точки маршрута ---------------
    for (let i = 0; i < this.points.length; i++) {
      this.renderPoints(this.points[i]);
    }
  };

  renderPoints = (points) => {
    // ------------- контейнер для отрисовки точек и формы ------------------
    const listContainer = document.querySelector('.trip-events').querySelector('.trip-events__list');

    // -------------- экземпляры классов с их содержимым --------------------
    const pointComponent = new PointsView(points);
    const formComponent = new TripEventEditView(this.destination, this.offer);

    // ----------- отрисовка точек в контейнер -------------
    render(pointComponent, listContainer);
    //render(formComponent, listContainer);
    // -------------- функции по замене элементов ---------------
    const replacePointToForm = (point) => listContainer.replaceChild(formComponent.getElement(), point.getElement());
    const replaceFormToPoint = () => listContainer.replaceChild(pointComponent.getElement(), formComponent.getElement());

    // --------------- на свойстве экз-ра нашел кнопку и повесил слушатель -----
    pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      replacePointToForm(evt.target);
    });

    // ----------------- на форму вешаю слушатель ---------------
    formComponent.getElement().addEventListener('submit', (evt)=> {
      evt.preventDefault();
      replaceFormToPoint();
    });

    // ----------------- закрытие формы при Esc ---------
    document.addEventListener('keydown', (evt) => {
      if (evt.target === 'Escape') {
        replaceFormToPoint();
      }
    });

    // ----------------- закрытие формы по клику -----------
    pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });
  };
}
