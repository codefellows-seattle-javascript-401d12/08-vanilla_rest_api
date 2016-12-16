'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Dog = require('../model/dogs.js');

module.exports = function(router) {
  router.get('/api/dog', function(res, req) {
    if (req.url.query.id) {
      storage.fetchItem('dog', req.url.query.id)
      .then( dog => {
        response.sendJSON(res, 200, dog);
      })
      .catch( err => {
        console.log(err);
        response.sendText(404, 'not found');
      });
      return;
    }
    response.sendText(400, 'bad request');
  });

  router.post('/api/dog', function(res, req) {
    try {
      var dog = new Dog(req.body.name, req.body.breed, req.body.color);
      storage.createItem('dog', dog);
      response.sendJSON(res, 200, dog);
    } catch(err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
};
