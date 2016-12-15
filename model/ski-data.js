'use strict';

const uuid = require('node-uuid');

module.exports = function(location, rating, lat, long) {
  if(!location) throw new Error('expected location');
  if(!rating) throw new Error('expected rating');
  if(!lat) throw new Error('expected lat data');
  if(!long) throw new Error('expected long data');

  this.id = uuid.v4();
  this.location = location;
  this.rating = rating;
  this.latlong = [lat, long];
};
