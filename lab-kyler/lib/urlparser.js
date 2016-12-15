'use strict';

const urlParse = require('url').parse;
const querystringParse = require('querystring').parse;

module.exports = function(req) {
  req.url = urlParse(req.url);
  req.url.query = querystringParse(req.url.query);
  return Promise.resolve(req); //makes it chainable
};
