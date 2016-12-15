'use strict';

const uuid = require('node-uuid');

module.exports = function(name, genre) {
  if(!name) throw new Error('expected artist name');
  if(!genre) throw new Error('expected genre');

  this.id = uuid.v1();
  this.name = name;
  this.genre = genre;
};
