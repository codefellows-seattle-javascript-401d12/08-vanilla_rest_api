'use strict';

const Promise = require('bluebird');
const fs = Promise.promisify(require('fs'), {suffix: 'Prom'});
const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('No schema name provided.'));
  if (!item) return Promise.reject(new Error('No item provided.'));
  if (!item.age) return Promise.reject(new Error('Student has no age field.'));
  if (!item.name) return Promise.reject(new Error('Student has no name field.'));

  var data = JSON.stringify(item);
  fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, data)
  .then(() => Promise.resolve(data))
  .catch(err => Promise.reject(err));
};

exports.getItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('No schema name provided.'));
  if (!id) return Promise.reject(new Error('No ID provided.'));

  fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => Promise.resolve(data))
  .catch(err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('No schema name provided.'));
  if (!id) return Promise.reject(new Error('No ID provided.'));

  fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .then(arrayOfFiles => Promise.resolve(arrayOfFiles))
  .catch(err => Promise.reject(err));
};

exports.getAllItems = function() {
  var allIds = Object.keys(storage['student']);
  return Promise.resolve(allIds);
};
