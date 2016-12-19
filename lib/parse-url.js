'use strict';

const parseURL = require('url').parse;
const parseQuery = require('querystring').parse;
const consoleLog = require(`${__dirname}/../.console.js`);

module.exports = function(req) {
  consoleLog('Run parseURL function');
  req.url = parseURL(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req);
};
