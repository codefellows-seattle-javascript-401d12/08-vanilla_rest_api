'use strict';

module.exports = exports = {};

exports.sendJSON = function(response, status, data) {
  response.writeHead(status, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(data));
};

exports.sendText = function(response, status, errorMessage, error) {
  if (error) console.error(error);
  response.writeHead(status, {'Content-Type': 'application/json'});
  response.end(errorMessage);
};
