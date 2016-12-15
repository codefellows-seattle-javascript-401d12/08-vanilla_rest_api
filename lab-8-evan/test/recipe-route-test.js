'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Recipe routes', function() {
  var recipe = null;

  describe('POST: /api/recipe', function() {
    it('should return a recipe', function(done) {
      request.post('localhost:3000/api/recipe')
      .send({ name: 'test name', ingredients: 'test ingredients', category: 'test category'})
      .end((err, res) => {
        // if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.ingredients).to.equal('test ingredients');
        expect(res.body.category).to.equal('test category');
        recipe = res.body;
        done();
      });
    });
  });
  
  describe('GET: /api/recipe', function() {
    it('should return a recipe', function(done) {
      request.get(`localhost:3000/api/recipe?id=${recipe.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.ingredients).to.equal('test ingredients');
        expect(res.body.category).to.equal('test category');
        done();
      });
    });
  });
});
