'use strict';

const http = require('http');
const Dogs = require('./model/dogs.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 8000;
const router = new Router();



const server = http.createServer(router.route());
server.listen(PORT, () => {
  console.log('Server up:', PORT);
});
