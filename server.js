'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const consoleLog = require(`${__dirname}/.console.js`);
const PORT = process.env.PORT || 3000;
const routes = new Router();

consoleLog('require in and call routes.js');
require('./routes/routes.js')(routes);

consoleLog('create server and call routes.route');
const server = http.createServer(routes.route());

server.listen(PORT, () => {
  consoleLog(`Server is up on ${PORT}`);
  // console.log(`Server is up on ${PORT}`);
});
