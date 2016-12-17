'use strict';

const storage = {};

module.exports = exports = {};

exports.createEntry = function(schemaName, entry) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!entry) return Promise.reject(new Error('expected entry data'));
  if (!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][entry.id] = entry;
  return Promise.resolve(entry);
};

exports.fetchEntry = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));

    var schema = storage[schemaName];
    if (!schema) return reject(new Error('schema not found'));

    var entry = schema[id];
    if (!entry) return reject(new Error('entry not found'));

    resolve(entry);
  });
};

exports.deleteEntry = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));

    if(!storage[schemaName][id]) return reject(new Error ('nothing there - expected something to delete'));
    delete storage[schemaName][id];
    console.log(storage);

    resolve();
  });
};
