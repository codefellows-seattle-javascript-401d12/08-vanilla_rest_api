'use strict';

const parseUrl = require('./url-parser.js');
const parseJSON = require('./body-parser.js');

const Router = module.exports = () => {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

Router.prototype.get = (endpoint, callback) => {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = (endpoint, callback) => {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = (endpoint, callback) => {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = (endpoint, callback) => {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = () => {
  return (request, response) => {
    Promise.all([
      parseUrl(request),
      parseJSON(request)
    ])
    .then(() => {
      if (typeof this.routes[request.method][request.url.pathname] === 'function') {
        this.routes[request.method][request.url.pathname](request, response);
        return;
      }

      console.error('No such route exists.');

      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('No such route exists.');
      response.end();
    })
    .catch(err => {
      console.error(err);

      response.writeHead(400, {'Content-Type': 'text/plain'});
      response.write('Bad request.');
      response.end();
    });
  };
};
