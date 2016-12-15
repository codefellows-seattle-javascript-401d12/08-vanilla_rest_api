'use strict';

const parseURL = require('./url-parser.js');
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
