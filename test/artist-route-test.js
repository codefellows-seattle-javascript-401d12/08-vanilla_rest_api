'use strict';

const request = require('superagent');
const expect = require('chai').expect;

describe('Artist Routes', function() {
  var artist = null;

  describe('POST: /api/artist', function() {
    it('should return a artist', function(done) {
      request.post('localhost:4130/api/artist')
      .send({bandName: 'test name', genre: 'test genre'})
      .end((err, response) => {
        if (err) return done(err);
        expect(response.status).to.equal(200);
        expect(response.body.bandName).to.equal('test name');
        expect(response.body.genre).to.equal('test genre');
        artist = response.body;
        done();
      });
    });
  });
  describe('GET:')
  //TODO: create GET test

  describe('PUT:')
  //TODO: create PUT test
  describe('DELETE:')
  //TODO: create DELETE request
});
