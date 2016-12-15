'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = (schemaName, item) => {
  if (!schemaName) return Promise.reject(new Error('No schema name provided.'));
  if (!item) return Promise.reject(new Error('No item provided.'));
  if (!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][item.id] = item;

  return Promise.resolve(item);
};

exports.getItem = (schemaName, id) => {
  if (!schemaName) return Promise.reject(new Error('No schema name provided.'));
  if (!id) return Promise.reject(new Error('No ID provided.'));

  var schema = storage[schemaName];
  if (!schema) return Promise.reject(new Error('Schema not found.'));

  var item = schema[id];
  if (!item) return Promise.reject(new Error('No student exists with that ID.'));

  return Promise.resolve(item);
};

exports.deleteItem = (schemaName, id) => {
  if (!schemaName) return Promise.reject(new Error('No schema name provided.'));
  if (!id) return Promise.reject(new Error('No ID provided.'));

  var schema = storage[schemaName];
  if (!schema) return Promise.reject(new Error('Schema not found.'));

  var item = schema[id];
  if (!item) return Promise.reject(new Error('No student exists with that ID.'));

  delete storage[schemaName][id];
  return Promise.resolve(item);
};
