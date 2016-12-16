'use strict';

const data = require('../lib/data.js');
const SkiData = require('../model/ski-data.js');

module.exports = function(routes){
  routes.get('/api/ski-data', (req, res) => {
    if(req.url.query.id) {
      data.getData('location', req.url.query.id)
      .then( skiData => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(skiData));
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Not found');
        res.end();
      });
      return;
    }
    if(!req.url.query.id) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  routes.post('/api/ski-data', (req, res) => {
    try {
      var skiData = new SkiData(req.body.location, req.body.rating);
      data.setData('location', skiData);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(skiData));
      res.end();
    } catch(err) {
      console.error(err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  // routes.put('/api/ski-data', (req, res) => {
  //TODO: add put route
  // });

  routes.delete('/api/ski-data', (req, res) => {
    if(req.url.query.id) {
      data.removeData('location', req.url.query.id)
      .then( () => {
        res.writeHead(204, {'Content-Type': 'application/json'});
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Not found');
        res.end();
      });
      return;
    }
  });
};
