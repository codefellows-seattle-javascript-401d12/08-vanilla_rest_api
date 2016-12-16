'use strict';

const storage = require('./lib/storage.js');
const Artist = require('./model/music-artists.js');
const response = require('../lib/response.js');

module.exports = function(router) {

  router.get('/api/artist', function (request, res) {
    if (request.url.query.id) {
      storage.fetchItem('artist', request.url.query.id)
      .then( artist => {
        response.sendJSON(res, 200, artist);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/artist', function(request, res) {
    try {
      console.log(request.body);
      var artist = new Artist(request.body.name, request.body.genre);
      storage.createItem('artist', artist);
      response.sendJSON(res, 200, artist);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });

  router.delete('/api/artist', function(request, res) {
    if (request.url.query.id) {
      storage.deleteItem('artist', request.url.query.id)
      .then( () => {
        response.sendJSON(res, 204);
        console.log('artist deleted');

      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
  });
};
