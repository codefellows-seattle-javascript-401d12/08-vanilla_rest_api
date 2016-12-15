'use strict';

const data = {};

module.exports = exports = {};

exports.setData = (schemaName, item) => {
  if(!schemaName) return Promise.reject(new Error('Expected schema name but was not provided one'));
  if(!item) return Promise.reject(new Error('Expected item but was not provided one'));
  if(!data[schemaName]) data[schemaName] = {};

  data[schemaName][item.id] = item;
  return Promise.resolve(item);
};

exports.getData = (schemaName, id) => {
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('Expected schema name but was not provided one'));
    if(!id) return reject(new Error('Expected id but was not provided one'));

    var schema = data[schemaName];
    if(!schema) return reject(new Error('schema not found'));

    var item = schema[id];
    if(!item) return reject(new Error('item not found'));

    resolve(item);
  });
};
