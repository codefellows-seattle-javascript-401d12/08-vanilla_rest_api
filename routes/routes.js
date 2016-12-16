'use strict';

const data = require('../lib/data.js');
const SkiData = require('../model/ski-data.js');
const response = require('../lib/response.js');

module.exports = function(routes){
  routes.get('/api/ski-data', (req, res) => {
    if(req.url.query.id) {
      data.getData('location', req.url.query.id)
      .then( skiData => {
        response.JSON(res, 200, skiData);
      })
      .catch( err => {
        console.error(err);
        response.text(res, 404, 'Not found');
      });
      return;
    }
    if(!req.url.query.id) {
      response.text(res, 400, 'Bad request');
    }
  });

  routes.post('/api/ski-data', (req, res) => {
    try {
      var skiData = new SkiData(req.body.location, req.body.rating);
      data.setData('location', skiData);
      response.JSON(res, 200, skiData);
    } catch(err) {
      console.error(err);
      response.text(res, 400, 'Bad request');
    }
  });

  // routes.put('/api/ski-data', (req, res) => {
  //TODO: add put route
  // });

  routes.delete('/api/ski-data', (req, res) => {
    if(req.url.query.id) {
      data.removeData('location', req.url.query.id)
      .then( () => {
        response.JSON(res, 204, 'No content');
      })
      .catch( err => {
        console.error(err);
        response.text(res, 404, 'Not found');
      });
      return;
    }
    if(!req.url.query.id) {
      response.text(res, 400, 'Bad request');
    }
  });
};
