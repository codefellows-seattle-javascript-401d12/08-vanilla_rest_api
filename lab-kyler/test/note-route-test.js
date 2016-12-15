'use strict';

const request = require('superagent');
const expect = require('chai').expect;

//require('../server.js');

describe('Route: /api/joke', function() {
  var testJoke = {setup: 'I just flew in from Chernobyl', punchline: 'and boy, are my arms legs!'};

  describe('GETing a nonexistent joke', function() {
    it('should return status 404 and body "not found"', function (done) {
      request.get('localhost:2000/api/joke?id=abc123')
      .end( (err, res) => {
        if (err.status !== 404) done(err);
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });
  });

  describe('POSTing a hilarious joke', function() {
    it('should return status 200 and a JSON joke', function (done) {
      request.post('localhost:2000/api/joke')
      .send({setup: testJoke.setup, punchline: testJoke.punchline})
      .end( (err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(typeof res.body.id).to.equal('string');
        expect(res.body.setup).to.equal(testJoke.setup);
        expect(res.body.punchline).to.equal(testJoke.punchline);
        testJoke.id = res.body.id;
        done();
      });
    });
  });

  describe('GETing without a joke ID', function() {
    it('should return status 200 and a list of joke IDs', function (done) {
      request.get('localhost:2000/api/joke')
      .end( (err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(typeof res.body).to.equal('object');
        done();
      });
    });
  });

  describe('GETing a valid joke ID', function() {
    it('should return status 200 and a gut buster', function (done) {
      request.get(`localhost:2000/api/joke?id=${testJoke.id}`)
      .end( (err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(testJoke.id);
        expect(res.body.setup).to.equal(testJoke.setup);
        expect(res.body.punchline).to.equal(testJoke.punchline);
        done();
      });
    });
  });

  describe('POSTing an invalid joke', function() {
    it('should return status 400 and body "not found"', function (done) {
      request.post('localhost:2000/api/joke')
      .send('how do i shot web')
      .end( (err, res) => {
        if (err.status !== 400) done(err);
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });
});
