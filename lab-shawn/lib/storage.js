'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'),{suffix: 'Prom'});
const createError = require('http-errors');
const debug = require('debug')('person:storage');


module.exports = exports = {};

exports.createInstance = function(schemaName, person){
  debug('createInstance');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!person) return Promise.reject(createError(400, 'expected a person'));

  let json = JSON.stringify(person);

  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${person.id}.json`,json)
  .then( () => person )
  .catch( err => Promise.reject(createError(404,err.message)));
};

exports.fetchInstance = function(schemaName,id){
  debug('fetchInstance');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected an id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      let person = JSON.parse(data.toString());
      return person;
    })
    .catch(err => Promise.reject(createError(404,err.message)));
};

exports.deleteInstance = function(schemaName,id){
  debug('deleteInstance');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .catch(err => Promise.reject(createError(404,err.message)));

};
