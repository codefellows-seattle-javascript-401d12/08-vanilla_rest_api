'use strict';

//const storage = require('../lib/memStorage.js');
const storage = require('../lib/diskStorage.js');
const Joke = require('../model/joke.js');
const response = require('../lib/response.js');

module.exports = function(router) {

  router.post('/api/joke', function(req, res) {
    try{
      var joke = new Joke(req.body.setup, req.body.punchline);
      storage.storeItem('joke', joke);
      response.sendJSON(res, 200, joke);
    } catch(err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });

  router.get('/api/joke', function(req, res) {
    if (!req.url.query.id) {
      storage.enumerate('joke')
      .then( list => response.sendJSON(res, 200, list))
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'problem fetching joke list');
      });
    }
    else {
      storage.fetchItem('joke', req.url.query.id)
      .then (data => {
        response.sendJSON(res, 200, data);
      })
      .catch( () => {
        response.sendText(res, 404, 'not found');
      });
    }
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

};
