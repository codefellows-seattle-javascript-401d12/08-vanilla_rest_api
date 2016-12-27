'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const List = require('../model/list.js');

const restaurantRouter = module.exports = new Router();

restaurantRouter.post('/api/list/:listID/restaurant', jsonParser, function(req, res, next) {
  List.findByIdAndAddNote(req.params.listID, req.body)
  .then( note => res.json(note))
  .catch(next);
});
