'use strict';

const http = require('http');
const Pin = require('./model/pin.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

const server = http.createServer();

server.listen(PORT, () => {
  console.log('server running:', PORT);
});
