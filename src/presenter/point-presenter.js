import TripEventEditView from '../view/trip-event-edit-view.js';
import PointsView from '../view/point-view.js';
import {render, remove, replace} from '../framework/render.js';

export default class PointPresenter {

  constructor (destination, offer, changeData) {
    this.destination = destination;
    this.offer = offer;
    this.changeData = changeData;
  }

  pointComponent = null;
  pointEditComponent = null;
  listContainer = null;
  cancelButton = null;
  arrowButton = null;

  init = (point) => {
    this.point = point;

    // ------------- контейнер для отрисовки точек и формы ------------------
    this.listContainer = document.querySelector('.trip-events').querySelector('.trip-events__list');

    const prevPointComponent = this.pointComponent;
    const prevFormComponent = this.formComponent;

    // -------------- экземпляры классов с их содержимым --------------------
    this.pointComponent = new PointsView(this.point);
    this.formComponent = new TripEventEditView(this.destination, this.offer);

    // --------------- смена точки на форму ---------------------
    this.pointComponent.setEditClickHandler(this.replacePointToForm);

    // -------------- закрытие формы через стрелку ---------------
    this.formComponent.setArrowClickHandler(this.replaceFormToPoint);

    // ----------------- закрыте формы через cancel -----------
    this.formComponent.setCancelClickHandler(this.replaceFormToPoint);

    // ----------------- на форму вешаю слушатель ---------------
    this.formComponent.setFormSubmitHandler(this.replaceFormToPoint);

    // ----------------- слушатель кнопки избранное -------------
    this.pointComponent.setFavoriteClickHandler(this.handleFavoriteClick);

    // ----------------- проверка на наличие элементов и отрисовка точек -------
    if (prevPointComponent === null || prevFormComponent === null) {
      render(this.pointComponent, this.listContainer);
      return;
    }

    // ----------------- проверка на наличие элементов в DOM -----------
    if (this.listContainer.contains(prevPointComponent.element)) {
      replace(this.pointComponent, prevPointComponent);
    }

    if (this.listContainer.contains(prevFormComponent.element)) {
      replace(this.formComponent, prevFormComponent);
    }
    remove(prevPointComponent);
    remove(prevFormComponent);
  };

  // -------------- функции по замене элементов ---------------
  replacePointToForm = () => {
    this.listContainer.replaceChild(this.formComponent.element, this.pointComponent.element);
    document.addEventListener('keydown', this.shutDownHandler);
  };

  replaceFormToPoint = () => {
    this.listContainer.replaceChild(this.pointComponent.element, this.formComponent.element);
    document.removeEventListener('keydown', this.shutDownHandler);
  };

  // ----------------- закрытие формы при Esc ---------
  shutDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.replaceFormToPoint();
    }
  };

  handleFavoriteClick = () => {
    this.changeData({...this.point, isFavorite: !this.point.isFavorite});
  };
}
