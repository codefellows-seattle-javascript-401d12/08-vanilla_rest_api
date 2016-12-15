'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Pin Routes', function() {
  var pin = null;
  describe('POST: /api/pin', function() {
    it('needs to return a pin', function(done) {
      request.post('localhost:8000/api/pin')
      .send({title: 'test title', skill: 'test skill'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('test title');
        expect(res.body.skill).to.equal('test skill');
        pin = res.body;
        done();
      });
    });
  });

  describe('GET: /api/pin', function() {
    it('needs to return a pin', function(done) {
      request.get(`localhost:8000/api/pin?id=${pin.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('test title');
        expect(res.body.skill).to.equal('test skill');
        done();
      });
    });
  });

  describe('DELETE: /api/pin', function() {
    it('needs to return No Content', function(done) {
      request.delete(`localhost:8000/api/pin?id=${pin.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body.title).to.equal(undefined);
        expect(res.body.skill).to.equal(undefined);
        done();
      });
    });
  });
});
