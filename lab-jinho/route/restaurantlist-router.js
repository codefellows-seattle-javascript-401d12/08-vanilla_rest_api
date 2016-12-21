'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Restaurantlist = require('../model/restaurantlist.js');
const debug = require('debug')('restaurantlist:restaurantlist-router');
const restaurantlistRouter = module.exports = new Router();



restaurantlistRouter.post('/api/restaurantlist', jsonParser, function(req, res, next) {
  debug('POST: /api/restaurantlist');

  req.body.timestamp = new Date();
  new Restaurantlist(req.body).save()
  .then( restaurantlist => res.json(restaurantlist))
  .catch(next);
});

  // Restaurant.createRestaurant(req.body)
  // .then( restaurant => res.json(restaurant))
  // .catch( err => next(err));

restaurantlistRouter.get('/api/restaurantlist/:id', function(req, res, next) {
  debug('GET: /api/restaurantlist/:id');

  Restaurantlist.findById(req.params.id)
  .then( restaurantlist => res.json(restaurantlist))
  .catch(next);
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
