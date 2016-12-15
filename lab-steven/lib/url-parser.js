'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = (request) => {
  request.url = parseUrl(request.url);
  request.url.query = parseQuery(request.url.query);
  return Promise.resolve(request);
};
