'use strict';

const uuid = require('node-uuid');

module.exports = function(name, gender){
  if(!name) throw new Error('expected name');
  if(!gender) throw new Error('expected gender');

  this.id = uuid.v1();
  this.name = name;
  this.gender = gender;
}
