'use strict';

module.exports = function(res) {
  //I'm attaching a couple of utility methods to res
  // Modified from 07-vanilla-http-server
  res.send = function(msg) {
    res.writeHead(res.status || 200, res.statusMessage || 'OK', res.headers);
    res.write(msg + '\n');
    res.end();
  };

  res.json = function(obj) {
    res.headers['Content-Type'] = 'application/json';
    this.send(JSON.stringify(obj, null, 2));
  };

  res.err = function(status, message) {
    res.status  = status  || 500;
    message = message || 'Internal server error';

    this.send(message);
  };

  res.headers = {
    'Content-Type': 'text/plain'
  };

  return Promise.resolve(res);
};
