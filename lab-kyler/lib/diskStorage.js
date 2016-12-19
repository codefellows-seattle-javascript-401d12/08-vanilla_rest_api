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

exports.enumerate = (schema) => {
  if (!schema) return Promise.reject(new Error('no schema'));

  return fs.readdirProm(`${__dirname}/../data/${schema}/`)
  .then( fileArray => {
    fileArray.forEach( (val, i, array) => {
      array[i] = val.split('.')[0];
    });
    return fileArray;
  })
  .catch( (err) => err);
};

exports.deleteItem = (schema, id) => {
  if (!schema) return Promise.reject(new Error('no schema received'));
  if (!id) return Promise.reject(new Error('no item id received'));

  var path = `${__dirname}/../data/${schema}/${id}.json`;
  return fs.accessProm(path)
  .then( () => fs.unlinkProm(path))
  .catch(err => Promise.reject(err));
};
