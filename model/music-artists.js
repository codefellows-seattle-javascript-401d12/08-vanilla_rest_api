'use strict';

const uuid = require('node-uuid');

module.exports = function(bandName, genre) {
  if(!bandName) throw new Error('expected band name');
  if(!genre) throw new Error('expected genre');

  this.id = uuid.v4();
  this.bandName = bandName;
  this.genre = genre;
};
