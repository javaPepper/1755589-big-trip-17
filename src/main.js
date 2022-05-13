import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';

const presenter = new TripPresenter();

const pointsModel = new PointsModel();

const destinationModel = new DestinationModel();

const offerModel = new OfferModel();

presenter.init(pointsModel, destinationModel, offerModel);
