'use strict';
const consoleLog = require(`${__dirname}/../.console.js`);

module.exports = exports = {};

exports.JSON = function(res, status, data) {
  consoleLog('Run JSON function');
  res.writeHead(status, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(data));
  res.end();
};

exports.text = function(res, status, msg) {
  consoleLog('Run text function');
  res.writeHead(status, {'Content-Type': 'text/plain'});
  res.write(msg);
  res.end();
};
