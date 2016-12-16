'use strict';

const storage = {};

module.exports = exports = {};

exports.storeItem = (schema, item) => {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('no schema'));
    if (!item || !item.id) return reject(new Error('no item or item ID'));
    if (!storage[schema]) storage[schema] = {};

    storage[schema][item.id] = item;
    return resolve(item);
  });
};

exports.fetchItem = (schema, id) => {
  console.log('schema:', schema);
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('no schema'));
    if (!id) return resolve(Object.keys(storage[schema]));

    if (!storage[schema]) return reject(new Error('no schema'));
    if (!storage[schema][id]) return reject(new Error('no such item'));

    return resolve(storage[schema][id]);
  });
};

exports.deleteItem = (schema, id) => {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('no schema received'));
    if (!id) return reject(new Error('no item id received'));
    if (!storage[schema]) return reject(new Error('no such schema.'));

    delete storage[schema][id];
    return resolve();
  });
};
