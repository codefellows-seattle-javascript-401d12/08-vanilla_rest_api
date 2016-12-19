'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const consoleLog = require(`${__dirname}/../.console.js`);

module.exports = exports = {};


exports.setData = (schemaName, item) => {
  consoleLog('run setData function');
  if(!schemaName) return Promise.reject(new Error('Expected schema name but was not provided one'));
  if(!item) return Promise.reject(new Error('Expected item but was not provided one'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item)
    .catch( err => Promise.reject(err));
};

exports.getData = (schemaName, id) => {
  consoleLog('run getData function');
  if(!schemaName) return Promise.reject(new Error('Expected schema name but was not provided one'));
  if(!id) return Promise.reject(new Error('Expected id but was not provided one'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      let item = JSON.parse(data.toString());
      return item;
    })
    .catch( err => Promise.reject(err));
};

exports.removeData = (schemaName, id) => {
  consoleLog('run removeData function');
  if(!schemaName) return Promise.reject(new Error('Expected schema name but was not provided one'));
  if(!id) return Promise.reject(new Error('Expected id but was not provided one'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch( err => Promise.reject(err));
};
