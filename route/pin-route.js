'use strict';

const storage = require('../lib/storage.js');
const Pin = require('../model/pin.js');
const response = require('../lib/response.js');

module.exports = function(router) {
  router.get('/api/pin', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('pin', req.url.query.id)
      .then(pin => {
        response.sendJSON(res, 200, pin);
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'pin not found');
      });
      return;
    }
    if (!req.url.query.id) {
      response.sendText(res, 400, 'bad request');
    }
  });

  router.post('/api/pin', function(req, res) {
    try {
      var pin = new Pin(req.body.title, req.body.skill);
      storage.createItem('pin', pin);
      response.sendJSON(res, 200, pin);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });

  router.delete('/api/pin', function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem('pin', req.url.query.id)
      .then(() => {
        response.sendNoContent(res, 204);
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'pin not found');
      });
      return;
    }
  });
};
