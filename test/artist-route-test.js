'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Artist Routes', function() {
  var artist = null;

  describe('POST: /api/artist', function() {
    it('should return a artist', function(done) {
      request.post('localhost:4130/api/artist')
      .send({name: 'test name', genre: 'test genre'})
      .end((err, response) => {
        if (err) return done(err);
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('test name');
        expect(response.body.genre).to.equal('test genre');
        artist = response.body;
        done();
      });
    });
  });

  describe('GET: /api/artist', function() {
    it('should return a artist', function(done) {
      request.get(`localhost:4130/api/artist?id=${artist.id}`)
      .end((err, response) => {
        if (err) return done(err);
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('test name');
        expect(response.body.genre).to.equal('test genre');
        done();
      });
    });
  });

  describe('DELETE: /api/artist', function() {
    it('should delete an artist', function(done) {
      // request.delete(`localhost:4130/api/artist?id=${artist.id}`)
      request.delete(`localhost:4130/api/artist?id=${artist.id}`)
      .end((err, response) => {
        // if (err) return done(err);
        expect(response.status).to.equal(204);
        expect(response.body.name).to.equal(undefined);
        expect(response.body.genre).to.equal(undefined);
        done();
      });
    });
  });

});
