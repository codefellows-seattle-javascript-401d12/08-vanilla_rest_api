'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const router = new Router();
// const storage = require('./lib/memStorage.js');
// const Joke = require('./model/joke.js');

const PORT = process.env.PORT || 2001;

const server = http.createServer(router.route());

require('./route/note-route.js')(router);

server.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
