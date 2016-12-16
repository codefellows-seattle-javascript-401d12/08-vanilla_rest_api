'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createRecipe = function(schemaName, recipe) {
  if(!schemaName) return Promise.reject(new Error('expected schemaName'));
  if(!recipe) return Promise.reject(new Error('expected recipe'));

  let json = JSON.stringify(recipe);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${recipe.id}.json`, json)
  .then( () => recipe)
  .catch( err => Promise.reject(err));
};

exports.getRecipe = function(schemaName, id) {
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!id) return Promise.reject(new Error('expected an id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    let recipe = JSON.parse(data.toString());
    return recipe;
  })
  .catch( err => Promise.reject(err));
};
// WORKING ON GETTING ALL RECIPES BACK ----------------------------
// exports.getAllRecipes = function(schemaName, id) {
//   return new Promise((resolve, reject) => {
//     if(!schemaName) return reject(new Error('expected a schema name'));
//     if(!id) return reject(new Error('expected an id'));
//
//     var schema = recipeBox[schemaName];
//     if(!schema) return reject(new Error('no schema found'));
//
//     var recipes = recipeBox;
//     console.log(recipes);
//
//     resolve(recipes);
//   });
// };
// WORKING ON GETTING ALL RECIPES BACK ----------------------------

exports.deleteRecipe = function(schemaName, id) {
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!id) return Promise.reject(new Error('expected an id'));

  fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch( err => Promise.reject(err));
};
