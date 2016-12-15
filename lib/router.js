'use strict';

const parseUrl = require('./parse-url.js');
const parseJSON = require('./parse-json.js');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

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
  return (request, response) => {
    Promise.all([
      parseUrl(request),
      parseJSON(request)
    ])
    .then( () => {
      if(typeof this.routes[request.method][request.url.pathname] === 'function') {
        this.routes[request.method][request.url.pathname](request, response);
        return;
      }
      console.error('no route found');

      response.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      response.write('no route found');
      response.end();
    })
    .catch(err => {
      console.error(err);

      response.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      response.write('bad request');
      response.end();
    });
  };
};
