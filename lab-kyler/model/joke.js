'use strict';

const uuid = require('node-uuid');

module.exports = function(setup, punchline) {
  if (!setup) throw new Error('expected a joke setup');
  if (!punchline) throw new Error('expected a joke punchline');

  this.id = uuid.v1();
  //this.id = 'fakeid';
  this.setup = setup;
  this.punchline = punchline;
};
