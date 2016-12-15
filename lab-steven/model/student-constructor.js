'use strict';

const uuid = require('node-uuid');

module.exports = function(name, age) {
  this.id = uuid.v4();
  this.name = name;
  this.age = age;
};
