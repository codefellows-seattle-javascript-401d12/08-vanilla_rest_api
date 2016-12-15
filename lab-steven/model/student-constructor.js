'use strict';

const uuid = require('node-uuid');

module.exports = (name, age) => {
  this.id = uuid.v4();
  this.name = name;
  this.age = age;
};
