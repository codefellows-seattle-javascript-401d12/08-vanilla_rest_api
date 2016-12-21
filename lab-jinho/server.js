'use strict';

//**DEPENDENCIES**
//node modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('restaurantlist:server');


//npm modules

//custom modules


//environment variables
const app = express();
const PORT = process.env.PORT || 3000;
//module constants



//**START SERVER**

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
