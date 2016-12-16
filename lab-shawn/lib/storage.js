'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'),{suffix: 'Prom'});

module.exports = exports = {};

exports.createPerson = function(schemaName, person){
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!person) return Promise.reject(new Error('expected a person'));

  let json = JSON.stringify(person);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${person.id}.json`,json)
  .then( () => person )
  .catch( err => Promise.reject(err));
};

exports.fetchPerson = function(schemaName,id){
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!id) return Promise.reject(new Error('expected an id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      let person = JSON.parse(data.toString());
      return person;
    })
    .catch(err => Promise.reject(err));
};

exports.deletePerson = function(schemaName,id){
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!id) return Promise.reject(new Error('expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .catch(err => Promise.reject(err));

};
