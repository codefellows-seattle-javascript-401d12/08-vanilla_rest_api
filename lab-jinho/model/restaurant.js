'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('restaurant:restaurant');
const storage = require('../lib/storage.js');

const Restaurant = module.exports = function(restaurantname, address) {
  debug('restaurant constructor');

  if (!restaurantname) throw new Error('expected restaurant name');
  if (!address) throw new Error('expected address');

  this.id = uuid.v1();
  this.restaurantname = restaurantname;
  this.address = address;
};

Restaurant.createRestaurant = function(_restaurant) {
  debug('createRestaurant');

  try {
    let restaurant = new Restaurant(_restaurant.restaurantname, _restaurant.address);
    return storage.createItem('restaurant', restaurant);
  } catch (err) {
    return Promise.reject(err);
  }
};

Restaurant.fetchRestaurant = function(id) {
  debug('fetchRestaurant');
  return storage.fetchItem('restaurant', id);
};
