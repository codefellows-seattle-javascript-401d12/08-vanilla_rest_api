'use strict';

//**DEPENDENCIES**
//node modules
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('restaurant:server');

const Restaurant = require('./model/restaurant.js');
//npm modules

//custom modules


//environment variables
const PORT = process.env.PORT || 3000;
const app = express();
//module constants



//**START SERVER**
app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('debugging test route');
  res.json({ 'msg': 'test route works'});
});

app.post('/api/restaurant', jsonParser, function(req, res, next) {
  debug('POST: /api/restaurant');

  Restaurant.createRestaurant(req.body)
  .then( restaurant => res.json(restaurant))
  .catch( err => next(err));
});

app.get('/api/restaurant', function(req, res, next) {
  debug('GET: /api/restaurant');

  Restaurant.fetchRestaurant(req.query.id)
  .then( restaurant => res.json(restaurant))
  .catch( err => next(err));
});

app.delete('/api/restaurant', function(req, res, next) {
  debug('DELETE: /api/restaurant');

  Restaurant.deleteRestaurant('restaurant', req.query.id)
  .then( () => res.status(204).send())
  .catch( err => next(err));
});

// eslint-disable-next-line
app.use(function(err, req, res, next) {
  debug('error middleware');

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);

});


app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});
