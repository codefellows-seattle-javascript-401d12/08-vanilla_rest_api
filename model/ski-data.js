'use strict';

const uuid = require('node-uuid');

module.exports = function(location, rating) {
  if(!location) throw new Error('expected location');
  if(!rating) throw new Error('expected rating');

  this.id = uuid.v4();
  this.location = location;
  this.rating = rating;
};
