'use strict';

const uuid = require('node-uuid');

module.exports = function(restaurantname, address) {
  if (!restaurantname) throw new Error('expected restaurant name');
  if (!address) throw new Error('expected address');

  this.id = uuid.v1();
  this.restaurantname = restaurantname;
  this.address = address;
};
