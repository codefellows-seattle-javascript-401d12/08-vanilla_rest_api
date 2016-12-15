'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Song Routes', function() {
  var song = null;

  describe('POST: /api/song', function() {
    it('should return a song', function(done) {
      request.post('localhost:3000/api/song')
      .send({ title: 'test title', description: 'test description' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('test title');
        expect(res.body.description).to.equal('test description');
        song = res.body;
        done();
      });
    });
  });

  describe('GET: /api/song', function() {
    it('should return a song', function(done) {
      request.get(`localhost:3000/api/song?id=${song.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('test title');
        expect(res.body.description).to.equal('test description');
        done();
      });
    });
  });
});
