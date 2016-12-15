'use strict';

const http = require('http');
const Cheese = require('./model/cheese.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/cheese', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('cheese', req.url.query.id)
    .then( cheese => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.strinify(cheese));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('File not found. Who moved my cheese?');
      res.end();
    });
    return;
  }
});

router.post('/api/cheese', function(req, res) {
  try {
    var cheese = new Cheese(req.body.name, req.body.content);
    storage.createItem('cheese', cheese);
    res.writeHead(200,{'Content-Type': 'application/json'});
    res.write(JSON.stringify(cheese));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(300,{'Content-Type': 'text/plain'});
    res.write('Bad request. Bad cheese.');
    res.end();
  }
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('The server is up at:', PORT);
});
