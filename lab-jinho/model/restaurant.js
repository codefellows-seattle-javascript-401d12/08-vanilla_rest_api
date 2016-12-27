'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = Schema({
  restaurantname: { type: String, required: true },
  address: { type: String, required: true },
  listID: { type: Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('restaurant', restaurantSchema);
