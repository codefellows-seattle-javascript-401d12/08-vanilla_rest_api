'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Spirit Animal Routes', function() {
  var spiritAnimal = null;

  describe('POST: /api/spiritAnimal', function() {
    it('should return a spirit animal, and a name', function(done) {
      request.post('localhost:3000/api/spiritAnimal')
      .send({ name: 'Hawa', spiritAnimal: 'pink dragon', spiritAnimalName: 'Simba'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Hawa');
        expect(res.body.spiritAnimal).to.equal('pink dragon');
        expect(res.body.spiritAnimalName).to.equal('Simba');
        spiritAnimal = res.body;
        done();
      });
    });
  });

  describe('GET: /api/spiritAnimal', function() {
    it('should return a spirit animal', function(done) {
      request.get(`localhost:3000/api/spiritAnimal?id=${spiritAnimal.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Hawa');
        expect(res.body.spiritAnimal).to.equal('pink dragon');
        expect(res.body.spiritAnimalName).to.equal('Simba');
        done();
      });
    });
  });

  describe('DELETE: /api/spiritAnimal', function() {
    it('should return no content', function(done) {
      request.delete(`localhost:3000/api/spiritAnimal?id=${spiritAnimal.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body.name).to.equal(undefined);
        expect(res.body.SpiritAnimal).to.equal(undefined);
        expect(res.body.spiritAnimalName).to.equal(undefined);
        done();
      });
    });
  });
});
