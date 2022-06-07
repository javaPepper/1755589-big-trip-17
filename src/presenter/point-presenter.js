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
  //point = null;

  init = (point) => {
    this.point = point;

    // ------------- контейнер для отрисовки точек и формы ------------------
    const listContainer = document.querySelector('.trip-events').querySelector('.trip-events__list');

    const prevPointComponent = this.pointComponent;
    const prevFormComponent = this.formComponent;

    // -------------- экземпляры классов с их содержимым --------------------
    this.pointComponent = new PointsView(this.point);
    this.formComponent = new TripEventEditView(this.destination, this.offer);

    // -------------- функции по замене элементов ---------------
    const replacePointToForm = () => listContainer.replaceChild(this.formComponent.element, this.pointComponent.element);
    const replaceFormToPoint = () => listContainer.replaceChild(this.pointComponent.element, this.formComponent.element);

    // --------------- на свойстве экз-ра нашел кнопку и повесил слушатель -----
    this.pointComponent.setEditClickHandler(replacePointToForm);

    // ----------------- на форму вешаю слушатель ---------------
    this.formComponent.setFormSubmitHandler(replaceFormToPoint);

    this.pointComponent.setFavoriteClickHandler(this.handleFavoriteClick);

    // ----------------- проверка на наличие элементов и отрисовка точек -------
    if (prevPointComponent === null || prevFormComponent === null) {
      render(this.pointComponent, listContainer);
      return;
    }

    // ----------------- проверка на наличие элементов в DOM -----------
    if (listContainer.contains(prevPointComponent.element)) {
      replace(this.pointComponent, prevPointComponent);
    }

    if (listContainer.contains(prevFormComponent.element)) {
      replace(this.formComponent, prevFormComponent);
    }
    remove(prevPointComponent);
    remove(prevFormComponent);

    // ----------------- закрытие формы при Esc ---------
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.replaceFormToPoint();
      }
    });
  };

  handleFavoriteClick = () => {
    this.changeData({...this.point, isFavorite: !this.point.isFavorite});
  };
}
