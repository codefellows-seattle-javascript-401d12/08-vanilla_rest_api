'use strict';

const http = require('http');
const BEV = require('./model/bevs.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const response = require('./lib/response.js');
const PORT = 3000;
const router = new Router();

router.get('/api/bev', function(req, res) {
  // GET data for a vehicle
  if (req.url.query.id) {
    storage.fetchEntry('bev', req.url.query.id)
    .then( bev => {
      response.sendJSON(res, 200, bev);
    })
    .catch( err => {
      console.error(err);
      response.sendText(res, 404, 'resource not found');
    });

    return;
  };

  if (req.url && !req.url.query.id) {
    storage.fetchAll('bev')
    .then( bev => {
      response.sendJSON(res, 200, bev);
    })
    .catch( err => {
      console.error(err);
      response.sendText(res, 404, 'resource not found');
    });

    return;
  };
});

router.post('/api/bev', function(req, res) {
  // POST data for a vehicle
  try {
    var bev = new BEV(req.body.vehicle, req.body.info);
    storage.createEntry('bev', bev);
    response.sendJSON(res, 200, bev);
  } catch (err) {
    console.error(err);
    response.sendText(res, 400, 'bad request');
  }
});

router.delete('/api/bev', function(req, res) {
  if (req.url.query.id) {
    storage.deleteEntry('bev', req.url.query.id)
    .then( bev => {
      response.sendText(res, 204, 'entry deleted - no content');
    })
    .catch( err => {
      console.error(err);
      response.sendText(res, 404, 'resource not found');
    });
  }
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
