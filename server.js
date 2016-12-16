'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const PORT = process.env.PORT || 8000;
const router = new Router();

require('./route/dog-route.js')(router);

const server = http.createServer(router.route());
server.listen(PORT, () => {
  console.log('Server up:', PORT);
});
