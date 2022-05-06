import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';

const presenter = new TripPresenter();

const pointsModel = new PointsModel();

presenter.init(pointsModel);
