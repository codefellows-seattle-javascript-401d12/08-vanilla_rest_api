'use strict';

module.exports = exports = {};

exports.sendJSON = function(response, status, data) {
  response.writeHead(status, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(data));
};

exports.sendText = function(response, status, errorMessage, error) {
  if (error) console.error(error);
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.end('Student not found.');
};
