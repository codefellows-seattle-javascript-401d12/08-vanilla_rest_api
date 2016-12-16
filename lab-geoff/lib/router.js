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
  return (req, res) => {
    //NOTE: These resemble ExpressJS middleware
    Promise.all([
      parseUrl(req),
      parseJSON(req),
      addMethods(res)
    ])
    .then( () => {
      console.log('Looking up route:',req.method,req.url.pathname);
      let route = this.routes[req.method][req.url.pathname];
      if(typeof route === 'function') {
        return route(req, res);
      }
      let msg = `route not found: ${req.method} ${req.url.pathname}`;
      console.error(msg);

      res.text(404, 'not found'); //Or is msg better?
    })
    .catch( err => {
      console.error(err);
      // res.err(400, 'bad request');
      res.text(400, 'bad request');
    });
  };
};
