'use strict';

const http = require('http');
const SkiData = require('./model/ski-data.js');
const Router = require('./lib/router.js');
const data = require('./lib/data.js');
const PORT = process.env.PORT || 8080;

const routes = new Router();

routes.get('/api/ski-data', (req, res) => {
  if(req.url.query.id) {
    data.getData('location', req.url.query.id)
    .then( skiData => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(skiData));
      res.end();
    })
    .catch( err => {
      console.log('server.js 20 ==========================\r\n', err);
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not found');
      res.end();
    });
    return;
  }
});

routes.post('/api/ski-data', (req, res) => {
  try {
    var skiData = new SkiData(req.body.location, req.body.rating);
    console.log('server.js 33 ==========================\r\n', skiData);
    data.setData('location', skiData);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(skiData));
    res.end();
  } catch(err) {
    console.log('server.js 39 ==========================\r\n', err);
    console.error(err);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

// routes.put('/api/ski-data', (req, res) => {
//
// });
//
routes.delete('/api/ski-data', (req, res) => {

});

const server = http.createServer(routes.route());

server.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
