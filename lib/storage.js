'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  if(!schemaName) return Promise.reject(new Error('expected schemaName'));
  console.log('item= ', item, 'schemaName: ', schemaName);

  if(!item) return Promise.reject(new Error('expected item'));

  if(!storage[schemaName]) storage[schemaName] = {};
  storage[schemaName][item.id] = item;
  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id){

  return new Promise(function(resolve, reject) {
    if(!schemaName) return reject(new Error('schemaName expected'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema not found!!'));

    var item = schema[id];
    if(!item) return resolve(schema);

    resolve(item);
  });
};

exports.fetchDel = function(schemaName, id){
  return new Promise(function(resolve, reject){
    if(!schemaName) return reject(new Error('schemaName expected!'));
    if(!id) return reject(new Error('id expected!'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema not found'));

    var item = schema[id];
    if(!item) return reject(new Error('item not found'));
    item = {};
    resolve(item);
  });
};
