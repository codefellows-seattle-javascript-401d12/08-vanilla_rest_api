'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));

    return fs.readFileProm(`${__dirname}/../data/${id}.json`)
    .then(data => {
        let item = JSON.parse(data.toString());
        return item;
    })
    .catch( err => Promise.reject(err));
  }

exports.deleteItem = function(schemaName, id){
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));

    return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json);
};
