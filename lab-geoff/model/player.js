'use strict';

const uuid = require('node-uuid');

function Player(name, email) {
  this.id = uuid.v4();
  this.name = name;
  this.email = email;
}

module.exports = Player;
