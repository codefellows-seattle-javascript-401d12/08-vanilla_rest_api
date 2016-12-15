'use strict';

const http = require('http');
const BEV = require('./model/bevs.js');
const Router = require('./lib/router.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/bev', function(req, res) {
  // TODO: GET data for a vehicle
});

router.post('/api/bev', function(req, res) {
  // TODO: POST data for a vehicle
});

const server = http.createServer();

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
