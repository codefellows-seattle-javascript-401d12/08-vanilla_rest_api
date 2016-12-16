'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const PORT = process.env.PORT || 8080;
const routes = new Router();

require('./routes/routes.js')(routes);

const server = http.createServer(routes.route());

server.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
