'use strict';

const uuid = require('node-uuid');

module.exports = function(name, spiritAnimal, spiritAnimalName) {
  if (!name) throw new Error('expected name');
  if (!spiritAnimal) throw new Error('expected spirit animal');
  if (!spiritAnimalName) throw new Error('expected favorite animal');

  this.id = uuid.v1();
  this.name = name;
  this.spiritAnimal = spiritAnimal;
  this.spiritAnimalName = spiritAnimalName;
};
