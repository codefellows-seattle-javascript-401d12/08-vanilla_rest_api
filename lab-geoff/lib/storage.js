'use strict';

const uuid = require('node-uuid');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

const storage = {};

exports.createItem = function(collection, item) {
  if(!collection) return Promise.reject(new Error('collection name not supplied'));
  if(!item) return Promise.reject(new Error('missing item to create'));

  item.id = item.id || uuid.v4().slice(0,8);

  let json = JSON.stringify(item);
  return fs.writeFileProm(`./data/${collection}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err));

  // if(!storage[collection]) storage[collection] = {};
  //
  // storage[collection][item.id] = item;
  // return Promise.resolve(item);
};

exports.fetchItem = function(collection, id) {
  if(!collection) return Promise.reject(new Error('collection name not supplied'));
  if(!id) return Promise.reject(new Error('missing id'));

  return fs.readFileProm(`./data/${collection}/${id}.json`)
  .then( data => {
    let item = JSON.parse(data.toString());
    return item;
  })
  .catch( err => Promise.reject(err));
};

exports.deleteItem = function(collection, id) {
  if(!collection) return Promise.reject(new Error('collection name not supplied'));
  if(!id) return Promise.reject(new Error('missing id'));

  return fs.unlinkProm(`./data/${collection}/${id}.json`);

  // var all = storage[collection];
  // if(!all) return Promise.reject(new Error(`collection ${collection} does not exist`));
  //
  // var item = all[id];
  // if(!item) return Promise.reject(new Error(`could not find ${id}`));
  //
  // delete all[id];
  //
  // resolve(item); //Giving back the removed item
};
