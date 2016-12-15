'use strict';

const request = require('superagent');
const expect = require('chai').expect;
require('../server.js');

describe('Data routes', function() {
  var data = null;

  describe('POST: /api/ski-data', function() {
    it('should return a data object', function(done) {
      request.post('localhost:3000/api/ski-data')
        .send({location: 'Mt baker', rating: 10})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.location).to.equal('Mt baker');
          expect(res.body.rating).to.equal(10);
          data = res.body;
          done();
        });
    });
  });
  describe('GET: /api/ski-data', function() {
    it('should return a data object', function(done) {
      request.get(`localhost:3000/api/ski-data?id=${data.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.location).to.equal('Mt baker');
          expect(res.body.rating).to.equal(10);
          done();
        });
    });
  });
  describe('DELETE: /api/ski-data', function() {
    it('should delete a data object', function(done) {
      request.delete(`localhost:3000/api/ski-data?id=${data.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
    });
  });
});
