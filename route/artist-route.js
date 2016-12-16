'use strict';

const Artist = require('./model/music-artists.js');
const storage = require('./lib/storage.js');

module.exports = function(router) {

  router.get('/api/artist', function (request, response) {
    if (request.url.query.id) {
      storage.fetchItem('artist', request.url.query.id)
      .then( artist => {
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        response.write(JSON.stringify(artist));
        response.end();
      })
      .catch( err => {
        console.error(err);
        response.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        response.write('not found');
        response.end();
      });
      return;
    }
  });

  router.post('/api/artist', function(request, response) {
    try {
      console.log(request.body);
      var artist = new Artist(request.body.name, request.body.genre);
      storage.createItem('artist', artist);
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.write(JSON.stringify(artist));
      response.end();
    } catch (err) {
      console.error(err);
      response.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      response.write('bad request');
      response.end();
    }
  });

  router.delete('/api/artist', function(request, response) {
    if (request.url.query.id) {
      storage.deleteItem('artist', request.url.query.id)
      .then( () => {
        response.writeHead(204);
        console.log('artist deleted');
        response.end();
      })
      .catch(err => {
        console.error(err);
        response.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        response.write('No Artist found');
      });
      return;
    }
  });
};
