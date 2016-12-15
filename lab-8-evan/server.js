'use strict';

const http = require('http');
const Recipe = require('./model/recipe.js');
const Router = require('./lib/router.js');
const recipeBox = require('./lib/recipeBox.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/recipe', function(req, res) {
  if(req.url.query.id) {
    recipeBox.getRecipe('recipe', req.url.query.id)
    .then( recipe => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(recipe));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('not found');
      res.end();
    });

    return;
  };

  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('bad request');
  res.end();
});

router.post('/api/recipe', function(req, res) {
  try {
    var recipe = new Recipe(req.body.name, req.body.ingredients, req.body.category);
    recipeBox.createRecipe('recipe', recipe);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(recipe));
    res.end();
  }
  catch(err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  };
});
// DELETE---------------------------------------
router.delete('/api/recipe', function(req, res) {
  if(req.url.query.id) {
    recipeBox.deleteRecipe('recipe', req.url.query.id)
    .then( () => {
      res.writeHead(204, {
        'Content-Type': 'text/plain'
      });
      res.write('Successfully deleted');
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write('bad request');
      res.end();
    });
  };
});
// DELETE---------------------------------------
const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`Recipe box up and running on ${PORT}`);
});
