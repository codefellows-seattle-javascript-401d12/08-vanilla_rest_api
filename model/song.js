'use strict';

const uuid = require('node-uuid');

module.exports = function(title, description) {
  if (!title) throw new Error('expected title');
  if (!description) throw new Error('expected description');

  this.id = uuid.v1();
  this.title = title;
  this.description = description;
};
