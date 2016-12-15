'use strict';

const uuid = require('node-uuid');

module.exports = function(student) {
  this.id = uuid.v4();
  Object.keys(student).forEach(function(key) {
    this[key] = student[key];
  }, this);
};
