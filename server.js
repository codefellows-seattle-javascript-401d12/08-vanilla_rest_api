'use strict';

const http = require('http');
const Pin = require('./model/pin.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/pin', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('pin', req.url.query.id)
    .then(pin => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(pin));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('not found');
      res.end();
    });
    return;
  }
  if (!req.url.query.id) {
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.post('/api/pin', function(req, res) {
  try {
    var pin = new Pin(req.body.title, req.body.skill);
    storage.createItem('pin', pin);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(pin));
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

router.delete('/api/pin', function(req, res) {
  if (req.url.query.id) {
    storage.deleteItem('pin', req.url.query.id)
    .then(() => {
      res.writeHead(204);
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('pin not found');
      res.end();
    });
    return;
  }
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server running:', PORT);
});
