'use strict';

const recipeBox = require('../lib/recipeBox.js');
const Recipe = require('../model/recipe.js');
const response = require('../lib/response.js');

module.exports = function(router) {
  router.get('/api/recipe', function(req, res) {
    if(req.url.query.id) {
      recipeBox.getRecipe('recipe', req.url.query.id)
      .then( recipe => {
        response.sendJSON(res, 200, recipe);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });

      return;
    }
    else {
      response.sendText(res, 400, 'bad request');
    }
  });
  router.post('/api/recipe', function(req, res) {
    try {
      var recipe = new Recipe(req.body.name, req.body.ingredients, req.body.category);
      recipeBox.createRecipe('recipe', recipe);
      response.sendJSON(res, 200, recipe);
    }
    catch(err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
  // DELETE---------------------------------------
  router.delete('/api/recipe', function(req, res) {
    if(req.url.query.id) {
      recipeBox.deleteRecipe('recipe', req.url.query.id)
      .then( () => {
        response.sendText(res, 204, 'Successfully deleted');
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 400, 'bad request');
      });
    }
  });
  // DELETE---------------------------------------
};
