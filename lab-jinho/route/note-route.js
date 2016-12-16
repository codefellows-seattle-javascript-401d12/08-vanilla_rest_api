'use strict';

const storage = require('../lib/storage.js');
const Note = require('../model/note.js');
const response = require('../lib/response.js');

module.exports = function(router) {

  //Logic: Method: GET
  router.get('/api/note', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('note', req.url.query.id)
      .then( note => {
        response.sendJSON(res, 200, note);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });

      return;
    }

    response.sendText(res, 400, 'bad request');
  });
  //Logic: Method: POST
  router.post('/api/note', function(req, res) {
    try {
      var note = new Note(req.body.restaurantname, req.body.address);
      storage.createItem('note', note);
      response.sendJSON(res, 200, note);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
  //Logic: Method: DELETE
  router.delete('/api/note', function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem('note', req.url.query.id)
      .then(() => {
        res.writeHead(204, {'Content-Type': 'application/json'});
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
};
