'use strict';

const parseURL = require('./parse-url.js');
const parseJSON = require('./parse-json.js');
const response = require('../lib/response.js');
const consoleLog = require(`${__dirname}/../.console.js`);

const Router = module.exports = function() {
  consoleLog('Run Router constructor');
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
  consoleLog('Run Router.get method', this.routes.GET);
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
  consoleLog('Run Router.post method', this.routes.POST);
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
  consoleLog('Run Router.put method', this.routes.PUT);
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
  consoleLog('Run Router.delete method', this.routes.DELETE);
};

Router.prototype.route = function() {
  consoleLog('Stage the routes.route method');
  return (req, res) => {
    consoleLog('Run route method');
    Promise.all([
      consoleLog('Run Promise.all method'),
      parseURL(req),
      parseJSON(req),
    ])
    .then( () => {
      if(typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }
      console.error('route not found');
      response.text(res, 404, 'Not found');
    })
    .catch( err => {
      console.error(err);
      response.text(res, 400, 'Bad request');
    });
  };
};
