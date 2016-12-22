'use strict';

//**DEPENDENCIES**
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('restaurantlist:server');
const restaurantlistRouter = require('./route/restaurantlist-route.js');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/restaurantlist';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//app.use()
app.use(cors());
app.use(morgan('dev'));
app.use(restaurantlistRouter);


//**START SERVER**
app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
