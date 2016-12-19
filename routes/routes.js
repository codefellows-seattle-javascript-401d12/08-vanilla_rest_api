'use strict';

const data = require('../lib/data.js');
const SkiData = require('../model/ski-data.js');
const response = require('../lib/response.js');
const consoleLog = require(`${__dirname}/../.console.js`);

module.exports = function(routes){
  consoleLog('Read through routes.js annoynmous function');
  routes.get('/api/ski-data', (req, res) => {
    consoleLog('run routes.get function');
    if(req.url.query.id) {
      data.getData('location', req.url.query.id)
      .then( skiData => {
        response.JSON(res, 200, skiData);
      })
      .catch( () => {
        response.text(res, 404, 'Not found');
      });
      return;
    }
    if(!req.url.query.id) {
      response.text(res, 400, 'Bad request');
    }
  });

  routes.post('/api/ski-data', (req, res) => {
    consoleLog('run routes.post function');
    try {
      var skiData = new SkiData(req.body.location, req.body.rating);
      data.setData('location', skiData);
      response.JSON(res, 200, skiData);
    } catch(err) {
      response.text(res, 400, 'Bad request');
    }
  });

  routes.delete('/api/ski-data', (req, res) => {
    consoleLog('run routes.delete function');
    if(req.url.query.id) {
      data.removeData('location', req.url.query.id)
      .then( () => {
        response.JSON(res, 204, 'No content');
      })
      .catch( () => {
        response.text(res, 404, 'Not found');
      });
      return;
    }
    if(!req.url.query.id) {
      response.text(res, 400, 'Bad request');
    }
  });
};
