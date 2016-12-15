'use strict';

const parseURL = require('./parse-url.js');
const parseJSON = require('./parse-json.js');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

// why can't I use => functions here?
Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
  return (req, res) => {
    console.log('router.js 34 ==========================\r\n', req.method);
    Promise.all([
      parseURL(req),
      parseJSON(req)
    ])
    .then( () => {
      console.log('router.js 40 ==========================\r\n', this.routes, req.method, req.url.pathname);
      if(typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }
      console.log('router.js 45 ==========================\r\n');
      console.error('route not found');
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('route not found');
      res.end();
    })
    .catch( err => {
      console.log('router.js 52 ==========================\r\n', err);
      // console.error(err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    });
  };
};
