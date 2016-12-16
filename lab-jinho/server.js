'use strict';

//**DEPENDENCIES**
//node modules
const http = require('http');
//npm modules

//custom modules
const Router = require('./lib/router.js');

//environment variables
const PORT = process.env.PORT || 3000;
//module constants
const router = new Router();

require('./route/note-route.js')(router);
//**START SERVER**
const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server up:', PORT);
});
