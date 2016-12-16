'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.storeItem = (schema, item) => {
  if (!schema) return Promise.reject(new Error('no schema'));
  if (!item || !item.id) return Promise.reject(new Error('no item or item ID'));

  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, JSON.stringify(item))
  .then( () => item)
  .catch( err => Promise.reject(err));
};

exports.fetchItem = (schema, id) => {
  if (!schema) return Promise.reject(new Error('no schema'));

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
  .then (data => JSON.parse(data.toString()))
  .catch (err => Promise.reject(err));
};

// exports.enumerate = (schema) => {
//   console.log('enumerate****************');
//   if (!schema) return Promise.reject(new Error('no schema'));
//
//   return fs.readdirProm(`${__dirname}/../data/${schema}`)
//   .then( files => {
//     console.log('files:', JSON.stringify(files));
//     return JSON.stringify(files);
//   })
//   .catch (err => Promise.reject(err));
// };

exports.deleteItem = (schema, id) => {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('no schema received'));
    if (!id) return reject(new Error('no item id received'));
    if (!storage[schema]) return reject(new Error('no such schema.'));

    delete storage[schema][id];
    return resolve();
  });
};
