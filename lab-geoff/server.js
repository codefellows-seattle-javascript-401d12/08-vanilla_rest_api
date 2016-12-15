'use strict';

const http = require('http');

const Player = require('./model/player.js');
const storage = require('./lib/storage.js');
const Router = require('./lib/router.js');
const router = new Router();

const PORT = process.env.PORT || 5555;

//TODO: Possibly move router config to a different file/module
router.get('/api/player', function(req, res) {
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

router.post('/api/player', function(req, res) {

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

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server up:', PORT);
});
