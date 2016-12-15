'use strict';

const parseUrl   = require('./parse-url.js');
const parseJSON  = require('./parse-json.js');
const addMethods = require('./add-response-methods.js');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

Router.prototype.get = function(endpoint, handler) {
  this.routes.GET[endpoint] = handler;
};

Router.prototype.post = function(endpoint, handler) {
  this.routes.POST[endpoint] = handler;
};

Router.prototype.put = function(endpoint, handler) {
  this.routes.PUT[endpoint] = handler;
};

Router.prototype.delete = function(endpoint, handler) {
  this.routes.DELETE[endpoint] = handler;
};

Router.prototype.route = function() {
  console.log('Router.route');
  return (req, res) => {
    console.log('Parsing request...');
    //NOTE: This resembles ExpressJS middleware
    Promise.all([
      parseUrl(req),
      parseJSON(req),
      addMethods(res)
    ])
    .then( () => {
      console.log('Looking up route...');
      let route = this.routes[req.method][req.url.pathname];
      if(typeof route === 'function') {
        console.log('found route');
        return route(req, res);
      }
      console.log('no route!');
      let msg = `route not found: ${req.method} ${req.url.pathname}`;
      console.error(msg);

      res.err(404, msg);
    })
    .catch( err => {
      console.error(err);
      res.err(400, 'bad request');
    });
  };
};
