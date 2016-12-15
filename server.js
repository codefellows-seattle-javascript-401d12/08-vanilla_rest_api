'use strict';

const http = require('http');
const Artist = require('./model/music-artists.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

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

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server live on PORT:', PORT);
});
