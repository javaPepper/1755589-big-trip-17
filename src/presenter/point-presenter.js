import TripEventEditView from '../view/trip-event-edit-view.js';
import PointsView from '../view/point-view.js';
import {render} from '../framework/render.js';

export default class PointPresenter {

  constructor (destination, offer) {
    this.destination = destination;
    this.offer = offer;
  }

  pointComponent = null;
  pointEditComponent = null;
  listContainer = null;

  init = (point) => {

    // ------------- контейнер для отрисовки точек и формы ------------------
    const listContainer = document.querySelector('.trip-events').querySelector('.trip-events__list');

    // -------------- экземпляры классов с их содержимым --------------------
    this.pointComponent = new PointsView(point);
    this.formComponent = new TripEventEditView(this.destination, this.offer);

    // ----------- отрисовка точек в контейнер -------------
    render(this.pointComponent, listContainer);

    // -------------- функции по замене элементов ---------------
    const replacePointToForm = () => listContainer.replaceChild(this.formComponent.element, this.pointComponent.element);
    const replaceFormToPoint = () => listContainer.replaceChild(this.pointComponent.element, this.formComponent.element);

    // --------------- на свойстве экз-ра нашел кнопку и повесил слушатель -----
    this.pointComponent.setEditClickHandler(() => {
      replacePointToForm();
    });

    // ----------------- на форму вешаю слушатель ---------------
    this.formComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
    });

    // ----------------- закрытие формы при Esc ---------
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        replaceFormToPoint();
      }
    });
    /*const prevTaskComponent = this.pointComponent;
    const prevTaskEditComponent = this.formComponent;


    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.pointComponent, this.formComponent);
      return;
    }
    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
*/
  };
}
