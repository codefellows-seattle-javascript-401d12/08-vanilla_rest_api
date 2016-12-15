'use strict';

const http = require('http');
const Dog = require('./model/dogs.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 8000;
const router = new Router();

router.get('/api/dog', function(req, res) {
  if(req.url.query.id) {
    storage.fetchItem('dog', req.url.query.id)
    .then( dog => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(dog));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('dog not found');
      res.end();
    });
    return;
  }
  if(!req.url.query.id) {
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request invalid id');
    res.end();
  }
});

router.post('/api/dog', function(req, res) {
  try {
    var dog = new Dog(req.body.name, req.body.breed, req.body.color);
    storage.createItem('dog', dog);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(dog));
    res.end();
  } catch(err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/dog', function(req, res) {
  if(req.url.query.id) {
    storage.deleteItem('dog', req.url.query.id)
    .then( dog => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(dog));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('dog not found');
      res.end();
    });
    return;
  }
});

const server = http.createServer(router.route());
server.listen(PORT, () => {
  console.log('Server up:', PORT);
});
