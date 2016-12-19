'use strict';

//**DEPENDENCIES**
//node modules
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('restaurant:server');

const app = express();
const Restaurant = require('./model/restaurant.js');
const storage = require('./lib/storage.js');
//npm modules

//custom modules


//environment variables
const PORT = process.env.PORT || 3000;
//module constants



//**START SERVER**
app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('debug test route');
  res.json({ 'msg': 'test route worked'});
});

app.post('/api/restaurant', jsonParser, function(req, res, next) {
  debug('POST: /api/restaurant');
  // TODO: build post route
});

app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});
