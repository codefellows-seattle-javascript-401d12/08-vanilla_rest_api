'use strict';

const http = require('http');
const Pin = require('./model/pin.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.post('/api/pin', function(req, res) {
  try {
    var pin = new Pin(req.body.name, req.body.content);
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

const server = http.createServer();

server.listen(PORT, () => {
  console.log('server running:', PORT);
});
