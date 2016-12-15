'use strict';

const http = require('http');

const Player = require('./model/player.js');
const storage = require('./lib/storage.js');
const Router = require('./lib/router.js');
const router = new Router();

const PORT = process.env.PORT || 5555;

//TODO: Possibly move router config to a different file/module
router.get('/player', function(req, res) {
  //I understand why we just check for what we want,
  //instead of checking for everything that could be wrong.
  //ex: if(!req.url || !req.url.query || !req.url.query.id ...)
  if(req.url.query.id) {
    storage.fetchItem('player', req.url.query.id)
    .then( player => {
      res.json(player);
    })
    .catch( err => {
      console.error(err);
      res.err(404, 'player not found');
    });
    return;
  }

  res.err(400, 'bad request, missing id');
});

router.post('/player', function(req, res) {

  if(!req.body.name || req.body.name.length === 0) {
    return res.err(400, 'bad request, missing name');
  }
  if(!req.body.email || req.body.email.length === 0) {
    return res.err(400, 'bad request, missing email');
  }
  //TODO: Assert that email is a valid email address.

  var player = new Player(req.body.name, req.body.email);
  storage.createItem('player', player)
  .then( () => {
    res.json(player);
  })
  .catch( (err) => {
    console.error(err);
    res.err(400, 'bad request');
  });
});

const server = http.createServer(function(req, res) {
  //I'm attaching a couple of utility methods to res
  // Modified from 07-vanilla-http-server
  res.send = function(msg) {
    res.writeHead(res.status || 200, res.statusMessage || 'OK', res.headers);
    res.write(msg + '\n');
    res.end();
  };

  res.json = function(obj) {
    res.headers['Content-Type'] = 'application/json';
    this.send(JSON.stringify(obj, null, 2));
  };

  res.err = function(status, message) {
    res.status  = status  || 500;
    message = message || 'Internal server error';

    this.send(message);
  };

  res.headers = {
    'Content-Type': 'text/plain'
  };

  console.log(req.method,req.url.pathname);

  router.route(req, res);
});

server.listen(PORT, () => {
  console.log('server up:', PORT);
});
