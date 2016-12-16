'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix:'Prom'});
// const storage = {undefined};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!item) return Promise.reject(new Error('expected item'));
  // if (!storage[schemaName]) storage[schemaName] = {};
  //
  // storage[schemaName][item.id] = item;
  // return Promise.resolve(item);
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  // return new Promise((resolve, reject) => {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.eject(new Error('expected id'));

  // var schema = storage[schemaName];
  // if (!schema) return reject(new Error('schema not found'));
  //
  // var item = schema[id];
  // if (!item) return reject(new Error('item not found'));
  //
  // resolve(item);
  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    let item = JSON.parse(data.toString());
    return item;
  })
  .catch( err => Promise.reject(err));

};

exports.deleteItem = function(schemaName, id) {
  // return new Promise((resolve, reject) => {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

    // var schema = storage[schemaName];
    // if (!schema) return reject(new Error('schema not found'));
    //
    // var item = schema[id];
    // if (!item) return reject(new Error('item not found'));

    // delete schema[id];
    // resolve(item);
  // });

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`);
};
