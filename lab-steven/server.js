'use strict';

const http = require('http');
const Student = require('./model/student-constructor.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 8080;
const router = new Router();

const server = http.createServer();

server.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
