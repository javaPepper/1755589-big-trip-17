import TripEventEditView from '../view/trip-event-edit-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripFiltersView from '../view/trip-filter-view.js';
import PointsView from '../view/point-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EmptyListForEverything from '../view/empty-list-for-everything-view.js';
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

    // ------------- Отрисовка сообщения при отсутствии точек -----------
    if (this.points.length === 0) {
      render(new EmptyListForEverything('Click New Event to create your first point'));
    }
    else {
    // -------------Отрисовка точки маршрута ---------------
      for (let i = 0; i < this.points.length; i++) {
        this.renderPoint(this.points[i]);
      }
    }
  };

  renderPoint = (point) => {

    // ------------- контейнер для отрисовки точек и формы ------------------
    const listContainer = document.querySelector('.trip-events').querySelector('.trip-events__list');

    // -------------- экземпляры классов с их содержимым --------------------
    const pointComponent = new PointsView(point);
    const formComponent = new TripEventEditView(this.destination, this.offer);

    // ----------- отрисовка точек в контейнер -------------
    render(pointComponent, listContainer);

    // -------------- функции по замене элементов ---------------
    const replacePointToForm = () => listContainer.replaceChild(formComponent.element, pointComponent.element);
    const replaceFormToPoint = () => listContainer.replaceChild(pointComponent.element, formComponent.element);

    // --------------- на свойстве экз-ра нашел кнопку и повесил слушатель -----
    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
    });

    // ----------------- на форму вешаю слушатель ---------------
    formComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
    });

    // ----------------- закрытие формы при Esc ---------
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        replaceFormToPoint();
      }
    });
  };
}
