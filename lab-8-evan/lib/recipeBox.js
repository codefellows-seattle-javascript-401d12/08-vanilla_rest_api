'use strict';

const recipeBox = {};

module.exports = exports = {};

exports.createRecipe = function(schemaName, recipe) {
  if(!schemaName) return Promise.reject(new Error('expected schemaName'));
  if(!recipe) return Promise.reject(new Error('expected recipe'));
  if(!recipeBox[schemaName]) recipeBox[schemaName] = {};

  recipeBox[schemaName][recipe.id] = recipe;

  return Promise.resolve(recipe);
};

exports.getRecipe = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('expected schema name'));
    if(!id) return reject(new Error('expected an id'));

    var schema = recipeBox[schemaName];
    if(!schema) return reject(new Error('no schema found'));

    var recipe = schema[id];
    if(!recipe) return reject(new Error('recipe not found'));

    resolve(recipe);
  });
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
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('expected schema name'));
    if(!id) return reject(new Error('expected an id'));

    var schema = recipeBox[schemaName];
    if(!schema) return reject(new Error('no schema found'));

    if(!schema[id]) return reject(new Error('recipe not found'));
    console.log(recipeBox);
    delete schema[id];
    console.log(recipeBox);
    resolve();
  });
};
