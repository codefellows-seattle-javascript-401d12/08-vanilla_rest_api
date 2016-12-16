'use strict';

const Player = require('../model/player.js');
const storage = require('../lib/storage.js');

module.exports = function(router) {
  router.get('/api/player', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('player', req.url.query.id)
      .then( player => {
        res.json(200, player);
      })
      .catch( err => {
        console.error(err);
        res.text(404, 'not found');
      });
      return;
    }
    res.text(400, 'bad request');
  });

  router.delete('/api/player', function(req, res) {
    if(req.url.query.id) {
      storage.deleteItem('player', req.url.query.id)
      .then( ()  => {
        res.text(204, '');
      })
      .catch( err => {
        console.error(err);
        res.text(404, 'not found');
      });
    }
  });

  router.post('/api/player', function(req, res) {
    if(!req.body.name || req.body.name.length === 0) {
      return res.text(400, 'bad request, missing name');
    }
    if(!req.body.email || req.body.email.length === 0) {
      return res.text(400, 'bad request, missing email');
    }
    //TODO: Assert that email is a valid email address.

    var player = new Player(req.body.name, req.body.email);
    storage.createItem('player', player)
    .then( () => {
      res.json(200, player);
    })
    .catch( (err) => {
      console.error(err);
      res.text(400, 'bad request');
    });
  });
};
