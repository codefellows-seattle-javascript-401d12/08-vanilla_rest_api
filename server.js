'use strict';

const http = require('http');
const SkiData = require('./model/ski-data.js');
const Router = require('./lib/router.js');
const PORT = process.env.PORT || 8080;

const routes = new Router();

routes.get('/api/ski-data', (req, res) => {

});

routes.post('/api/ski-data', (req, res) => {

});

routes.put('/api/ski-data', (req, res) => {

});

routes.delete('/api/ski-data', (req, res) => {

});

const server = http.createServer();

server.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
