'use strict';

const uuid = require('node-uuid');

module.exports = function(name, ingredients, category) {
  if(!name) throw new Error('expected a name');
  if(!ingredients) throw new Error('expected ingredients');
  if(!category) throw new Error('expected a category');

  this.id = uuid.v1();
  this.name = name;
  this.ingredients = ingredients;
  this.category = category;
};
