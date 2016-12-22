'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantlistSchema = Schema({
  restaurantname: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

module.exports = mongoose.model('restaurantlist', restaurantlistSchema);
