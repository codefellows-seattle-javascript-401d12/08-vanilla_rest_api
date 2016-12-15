'use strict';

const uuid = require('node-uuid');

module.exports = exports = {};

const storage = {};

exports.createItem = function(collection, item) {
  if(!collection) return Promise.reject(new Error('collection name not supplied'));
  if(!item) return Promise.reject(new Error('missing item to create'));

  item.id = item.id || uuid.v4().slice(0,8);

  if(!storage[collection]) storage[collection] = {};

  storage[collection][item.id] = item;
  return Promise.resolve(item);
};

exports.fetchItem = function(collection, id) {
  return new Promise( (resolve, reject) => {
    if(!collection) return reject(new Error('collection name not supplied'));
    if(!id) return reject(new Error('missing id'));

    var all = storage[collection];
    if(!all) return reject(new Error(`collection ${collection} does not exist`));

    var item = all[id];
    if(!item) return reject(new Error(`could not find ${id}`));

    resolve(item);
  });
};
