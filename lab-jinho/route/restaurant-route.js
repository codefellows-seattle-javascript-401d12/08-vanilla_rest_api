'use strict';

const storage = require('../lib/storage.js');
const Restaurant = require('../model/restaurant.js');
const response = require('../lib/response.js');

module.exports = function(router) {

  //Logic: Method: GET
  router.get('/api/restaurant', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('restaurant', req.url.query.id)
      .then( restaurant => {
        response.sendJSON(res, 200, restaurant);
      })
      .catch( err => {
        // console.error(err);
        response.sendText(res, 404, 'not found');
      });

      return;
    }

    response.sendText(res, 400, 'bad request');
  });
  //Logic: Method: POST
  router.post('/api/restaurant', function(req, res) {
    try {
      var restaurant = new Restaurant(req.body.restaurantname, req.body.address);
      storage.createItem('restaurant', restaurant);
      response.sendJSON(res, 200, restaurant);
    } catch (err) {
      // console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
  //Logic: Method: DELETE
  router.delete('/api/restaurant', function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem('restaurant', req.url.query.id)
      .then(() => {
        res.writeHead(204, {'Content-Type': 'application/json'});
        res.end();
      })
      .catch( err => {
        // console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
};
