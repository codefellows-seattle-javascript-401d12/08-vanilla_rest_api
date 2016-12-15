'use strict';

const storage = {};

module.exports = exports = {};

exports.createPerson = function(schemaName, person){
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!person) return Promise.reject(new Error('expected a person'));
  if(!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][person.id] = person;
  return Promise.resolve(person);
};

exports.fetchPerson = function(schemaName,id){
  return new Promise((resolve,reject) => {
    if(!schemaName) return reject(new Error('expected schema name'));
    if(!id) return reject(new Error('expected an id'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema not found'));

    var person = schema[id];
    if(!person) return reject(new Error('person not found'));

    resolve(person);
  });

};
exports.deletePerson = function(schemaName,id){
  return new Promise((resolve,reject) => {
    if(!schemaName) return reject(new Error('expected schema name'));
    if(!id) return reject(new Error('expected id'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema not found'));

    delete schema[id];
    resolve();

  });
};
