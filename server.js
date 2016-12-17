'use strict';

const http = require('http');
const BEV = require('./model/bevs.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = 3000;
const router = new Router();

router.get('/api/bev', function(req, res) {
  // GET data for a vehicle
  if (req.url.query.id) {
    storage.fetchEntry('bev', req.url.query.id)
    .then( bev => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(bev));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('resource not found');
      res.end();
    });

    return;
  }
});

router.post('/api/bev', function(req, res) {
  // POST data for a vehicle
  try {
    var bev = new BEV(req.body.vehicle, req.body.info);
    storage.createEntry('bev', bev);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(bev));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/bev', function(req, res) {
  if (req.url.query.id) {
    storage.deleteEntry('bev', req.url.query.id)
    .then( bev => {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write('resource deleted');
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('resource not found');
      res.end();
    });
  }
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
