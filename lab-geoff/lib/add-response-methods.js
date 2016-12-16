'use strict';

module.exports = function(res) {

  res.header = function(name, value) {
    this.headers = this.headers || {};
    this.headers[name] = value;
  };

  res.type = function(mime) {
    this.header('Content-Type', mime);
  };

  res.text = function(status, msg) {
    //TODO: What about a statusMessage? Like OK?
    this.type('text/plain');
    this.writeHead(status, this.headers);
    this.write(msg);
    this.end();
  };

  // res.send = function(msg) {
  //   res.writeHead(res.status || 200, res.statusMessage || 'OK', res.headers);
  //   res.write(msg + '\n');
  //   res.end();
  // };

  res.json = function(status, obj) {
    //TODO: If arguments[0] is an object, status = 200.
    this.type('application/json');
    this.writeHead(status, this.headers);
    this.write(JSON.stringify(obj));
    this.end();
  };

  // res.err = function(status, message) {
  //   res.status  = status  || 500;
  //   message = message || 'Internal server error';
  //   res.statusMessage = message;
  //
  //   this.send(message);
  // };

  // res.headers = {
  //   'Content-Type': 'text/plain'
  // };

  return Promise.resolve(res);
};
