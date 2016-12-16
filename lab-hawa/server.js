'use strict';

const http = require('http');
const SpiritAnimal = require('./model/spiritAnimal.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/spiritAnimal', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('spiritAnimal', req.url.query.id)
    .then( spiritAnimal => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(spiritAnimal));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('not found');
      res.end();
    });

    return;
  }
  if(!req.url.query.id) {
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.post('/api/spiritAnimal', function(req, res) {
  try {
    var spiritAnimal = new SpiritAnimal(req.body.name, req.body.spiritAnimal, req.body.spiritAnimalName);
    storage.createItem('spiritAnimal', spiritAnimal);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(spiritAnimal));
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

router.delete('/api/spiritAnimal', function(req, res) {
  if(req.url.query.id) {
    storage.deleteItem('spiritAnimal', req.url.query.id)
    .then ( spiritAnimal => {
      res.writeHead(204, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(spiritAnimal));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('spirit animal not found');
      res.end();
    });
    return;
  }
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server up:', PORT);
});
