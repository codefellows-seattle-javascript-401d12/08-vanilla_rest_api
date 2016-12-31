'use strict';

//**DEPENDENCIES**

//npm modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('restaurant:server');

//app modules
const listRouter = require('./route/list-route.js');
const restaurantRouter = require('./route/restaurant-route.js');
const errors = require('./lib/error-middleware.js');

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

app.use(listRouter);
app.use(restaurantRouter);
app.use(errors);


//**START SERVER**
app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
