'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('restaurant:restaurant');
const storage = require('../lib/storage.js');

const Restaurant = module.exports = function(restaurantname, address) {
  debug('restaurant constructor');

  if (!restaurantname) throw createError(400, 'expected restaurant name');
  if (!address) throw createError(400, 'expected address');

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
    return Promise.reject(createError(400, err.message));
  }
};

Restaurant.fetchRestaurant = function(id) {
  debug('fetchRestaurant');
  return storage.fetchItem('restaurant', id);
};

Restaurant.updateRestaurant = function(id, _restaurant) {
  debug('updateRestaurant');

  return storage.fetchItem('restaurant', id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( restaurant => {
    for (var prop in restaurant) {
      if (prop === 'id') continue;
      if (_restaurant[prop]) restaurant[prop] = _restaurant[prop];
    }
    return storage.createItem('restaurant', restaurant);
  });
};

Restaurant.deleteRestaurant = function(id) {
  debug('deleteRestaurant');
  return storage.deleteItem('restaurant', id);
};

Restaurant.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('restaurant');
};
