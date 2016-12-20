'use strict';

//**DEPENDENCIES**
//node modules
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const debug = require('debug')('restaurant:server');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');
const restaurantRouter = require('./route/restaurantRouter.js');
//npm modules

//custom modules


//environment variables
const PORT = process.env.PORT || 3000;
const app = express();
//module constants



//**START SERVER**
app.use(morgan('dev'));
app.use(cors);
app.use(errors);
app.use(restaurantRouter);

app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});
