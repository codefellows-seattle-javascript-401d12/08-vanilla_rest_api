'use strict';

module.exports = exports = {};

exports.sendJSON = function(response, status, data) {
  response.writeHead(status, {
    'Content-Type': 'application/json'
  });

  response.write(JSON.stringify(data));
  response.end();
};

exports.sendText = function(response, status, message) {
  response.writeHead(status, {
    'Content-Type': 'text/plain'
  });

  response.write(message);
  response.end();
};
