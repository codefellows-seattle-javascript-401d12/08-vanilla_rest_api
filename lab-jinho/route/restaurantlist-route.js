'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Restaurantlist = require('../model/restaurantlist.js');
const restaurantlistRouter = module.exports = new Router();



restaurantlistRouter.post('/api/restaurantlist', jsonParser, function(req, res, next) {
  req.body.timestamp = new Date();
  new Restaurantlist(req.body).save()
  .then(restaurantlist => res.json(restaurantlist))
  .catch(next);
});

restaurantlistRouter.get('/api/restaurantlist/:id', function(req, res, next) {
  Restaurantlist.findById(req.params.id)
  .then(restaurantlist => res.json(restaurantlist))
  .catch(next);
});
