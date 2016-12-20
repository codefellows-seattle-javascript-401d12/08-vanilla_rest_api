'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('restaurant:restaurant-router');
const Restaurant = require('../model/restaurant.js');
const restaurantRouter = new Router();

restaurantRouter.post('/api/restaurant', jsonParser, function(req, res, next) {
  debug('POST: /api/restaurant');

  Restaurant.createRestaurant(req.body)
  .then( restaurant => res.json(restaurant))
  .catch( err => next(err));
});

restaurantRouter.get('/api/restaurant/:id', function(req, res, next) {
  debug('GET: /api/restaurant/:id');

  Restaurant.fetchRestaurant(req.params.id)
  .then( restaurant => res.json(restaurant))
  .catch( err => next(err));
});

restaurantRouter.get('/api/restaurant', function(req, res, next) {
  debug('GET: /api/restaurant');

  Restaurant.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

restaurantRouter.put('/api/restaurant', jsonParser, function(req, res, next) {
  debug('PUT: /api/restaurant');

  Restaurant.updateRestaurant(req.query.id, req.body)
  .then( restaurant => res.json(restaurant))
  .catch(next);
});



module.exports = restaurantRouter;
