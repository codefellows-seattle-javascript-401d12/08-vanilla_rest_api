'use strict';

//**DEPENDENCIES**
//node modules
const http = require('http');
//npm modules

//custom modules
const Note = require('./model/note.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
//environment variables
const PORT = process.env.PORT || 3000;
//module constants
const router = new Router();

//Logic: Method: GET

//Logic: Method: POST

//Logic: Method: DELETE



//**START SERVER**
const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server up:', PORT);
});
