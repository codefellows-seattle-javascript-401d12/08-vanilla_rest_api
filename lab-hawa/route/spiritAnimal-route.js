'use strict';

const storage = require('../lib/storage.js');
const SpiritAnimal = require('../model/spiritAnimal.js');
const response = require('../lib/response.js');

module.exports = function(router) {
  router.get('/api/spiritAnimal', function(req, res) {
    console.log('req.url', req.url);
    if (req.url.query.id) {
      storage.fetchItem('spiritAnimal', req.url.query.id)
      .then( spiritAnimal => {
        response.sendJSON(res, 200, spiritAnimal);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'spirit animal not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/spiritAnimal', function(req, res) {
    try {
      var spiritAnimal = new SpiritAnimal(req.body.name, req.body.spiritAnimal, req.body.spiritAnimalName);
      storage.createItem('spiritAnimal', spiritAnimal);
      response.sendJSON(res, 200, spiritAnimal);
    } catch (err) {
      console.error(err);
      response.sendText(res, 404, 'bad request');
    }
  });

  router.delete('/api/spiritAnimal', function(req, res) {
    if(req.url.query.id) {
      storage.deleteItem('spiritAnimal', req.url.query.id)
      .then ( () => {
        response.sendNoCentent(res, 204);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'spirit animal not found');
      });
      return;
    }
  });
};
