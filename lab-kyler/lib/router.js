'use strict';

const urlparser = require('./urlparser.js');
const bodyparser = require('./bodyparser.js');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

Router.prototype.route = function() {
  return (req, res) => {

    Promise.all([
      urlparser(req),
      bodyparser(req),
    ])
    .then( () => {
      if (typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req,res);
        return;
      }
      console.error(`URL ${req.url.pathname} not found.`);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write(`URL ${req.url.pathname} not found.`);
      res.end();
    })
    .catch( err => {
      console.error(`Bad request: ${req.url}\nError: ${err}`);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    });

  };
};

Router.prototype.get = function(endpoint, cb) {
  this.routes.GET[endpoint] = cb;
};

Router.prototype.post = function(endpoint, cb) {
  this.routes.POST[endpoint] = cb;
};

Router.prototype.put = function(endpoint, cb) {
  this.routes.PUT[endpoint] = cb;
};

Router.prototype.delete = function(endpoint, cb) {
  this.routes.DELETE[endpoint] = cb;
};
