'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  req.url = parseUrl(req.url);
  req.query = parseQuery(req.url.query);
  return Promise.resolve(req);
};
