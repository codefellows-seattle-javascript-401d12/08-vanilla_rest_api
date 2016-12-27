'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('restaurant:list');
const Schema = mongoose.Schema;

const Restaurant = require('./restaurant.js');

const listSchema = Schema({
  restaurantname: { type: String, required: true },
  timestamp: { type: Date, required: true }
  restaurants: [{ type: Schema.Types.ObjectId, ref: 'restaurant' }]
});

const List = module.exports = mongoose.model('list', listSchema);

List.findByIdAndAddNote = function(id, restaurant) {
  debug('findByIdAndAddNote');

  return List.findById(id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( list => {
    restaurant.listID = list._id;
    this.tempList = list
    return new Restaurant(restaurant).save();
  })
  .then( restaurant => {
    this.tempList.restaurants.push(restaurant._id);
    this.tempRestaurant = restaurant;
    return this.tempList.save();
  })
  .then ( () => {
    return this.tempRestaurant;
  });
};
