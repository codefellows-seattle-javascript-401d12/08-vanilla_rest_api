'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const PORT = process.env.PORT || 3000;
// require('../server.js');

describe('Data routes', function() {
  var data = null;

  describe('POST: /api/ski-data', function() {
    it('should return a data object', function(done) {
      request.post(`localhost:${PORT}/api/ski-data`)
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
    it('should return a data object', function(done) {
      request.post(`localhost:${PORT}/api/ski-data`)
        .send({location: 'mt baker'})
        .end((res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
  describe('GET: /api/ski-data', function() {
    it('should return a data object', function(done) {
      request.get(`localhost:${PORT}/api/ski-data?id=${data.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.location).to.equal('Mt baker');
          expect(res.body.rating).to.equal(10);
          done();
        });
    });
    it('should return a 404 error', function(done) {
      request.get(`localhost:${PORT}/api/ski-data?id=123456789`)
        .end((res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should return a 400 error', function(done) {
      request.get(`localhost:${PORT}/api/ski-data`)
        .end((res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
  describe('DELETE: /api/ski-data', function() {
    it('should delete a data object', function(done) {
      request.delete(`localhost:${PORT}/api/ski-data?id=${data.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
    });
  });
});
