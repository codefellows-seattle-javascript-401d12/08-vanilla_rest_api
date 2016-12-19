'use strict';

const uuid = require('node-uuid');
const consoleLog = require(`${__dirname}/../.console.js`);

module.exports = function(location, rating) {
  consoleLog('Run ski-data function');
  if(!location) throw new Error('expected location');
  if(!rating) throw new Error('expected rating');

  this.id = uuid.v4();
  this.location = location;
  this.rating = rating;
};
