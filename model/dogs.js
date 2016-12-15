'use strict';

const uuid = require('node-uuid');

module.exports = function(name, breed, color) {
  if(!name) throw new Error('expected name');
  if(!breed) throw new Error('expected breed');
  if(!color) throw new Error('expected color');

  this.id = uuid.v1();
  this.name = name;
  this.breed = breed;
  this.color = color;
};
