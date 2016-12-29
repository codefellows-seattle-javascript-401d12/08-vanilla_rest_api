'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  if(!schemaName) return Promise.reject(new Error('expected schemaName'));
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
    delete schema[id];
    resolve();
  });
};

exports.put = function(schemaName, id, item){
  return new Promise(function(resolve, reject){
    if(!schemaName) return reject (new Error('schemaName expected'));
    if(!id) return reject(new Error('item id expected!!'));
    if(!item) return reject(new Error('item expected!'));

    var itemFound = exports.fetchItem('note', id)
    .then(itemFound => {
      if(item.name) itemFound.name = item.name;
      if(item.content) itemFound.content = item.content;
      if(item.favFood) itemFound.favFood = item.favFood;
      if(item.place) itemFound.place = item.place;

      resolve(itemFound);
    });

    if(!itemFound) return reject('item donot exist!!');

    return resolve();
  });
};
