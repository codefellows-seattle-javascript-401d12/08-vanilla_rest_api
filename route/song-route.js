'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Song = require('../model/song.js');

module.exports = function(router) {
  router.get('/api/song', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('song', req.url.query.id)
      .then( song => {
        response.sendJSON(res, 200, song);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/song', function(req, res) {
    try {
      var song = new Song(req.body.title, req.body.description);
      storage.createItem('song', song);
      response.sendJSON(res, 200, song);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });

  router.delete('/api/song', function(req, res){
    if(req.url.query.id) {
      storage.deleteItem('song', req.url.query.id)
      .then(() => {
        response.sendText(res, 204, 'no content');
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
};
