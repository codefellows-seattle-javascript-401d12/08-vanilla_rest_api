'use strict';

const http = require('http');
const bodyparser = require('./lib/bodyparser.js');
const urlparser = require('./lib/urlparser.js');
const Router = require('./lib/router.js');
const router = new Router();
const storage = require('./lib/memStorage.js');
const Joke = require('./model/joke.js');

const PORT = process.env.PORT || 2001;

router.post('/api/joke', function(req, res) {
  try{
    var joke = new Joke(req.body.setup, req.body.punchline);
    storage.storeItem('joke', joke);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(`Joke stored:\n${JSON.stringify(joke)}`);
    res.end();
  } catch(err) {
    console.error(err);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.get('/api/joke', function(req, res) {
  storage.fetchItem('joke', req.url.query.id)
  .then (joke => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(joke));
    res.end();
  })
  .catch( err => {
    console.error(err);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('not found.');
    res.end();
  });
});

router.delete('/api/joke', function(req, res) {
  storage.deleteItem('joke', req.url.query.id)
  .then ( () => {
    res.writeHead(204);
    res.end();
  })
  .catch( err => {
    console.error(err);
    res.writeHead(400);
    res.write('error deleting item.');
    res.end();
  });
});








const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
