'use strict';

//**DEPENDENCIES**

//npm modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('restaurantlist:server');

//app modules
const restaurantlistRouter = require('./route/restaurantlist-route.js');
const restaurantRouter = require('./');
const errors = require('./');

//environment variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/restaurant';

//**LOGIC**
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//middleware components app.use
const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(restaurantlistRouter);
app.use(restaurantRouter);
app.use(errors);


//**START SERVER**
app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
