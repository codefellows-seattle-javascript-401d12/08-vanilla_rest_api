'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Note Routes', function() {
  var note = null;

//POST: test 400 should respond with 'bad request' if no request body was provided or body was invalid
  describe('POST: /api/note', function(){
    it('respond with bad request - POST', function(done){
      request.post('localhost:3000/api/note')
      .send({invalid:'invalid body'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.be.equal('bad request');
        done();
      });
    });
  });
//POST: test 200 should respond with the body content for post request with valid body
  describe('POST: /api/note', function() {
    it('should return a note', function(done) {
      request.post('localhost:3000/api/note')
      .send({restaurantname: 'test restaurant name', address: 'test address'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.restaurantname).to.equal('test restaurant name');
        expect(res.body.address).to.equal('test address');
        note = res.body;
        done();
      });
    });
  });

//GET: test 404 should respond with 'not found' for valid requests made with id not found
  describe('GET: /api/note', function(){
    it('return error for no id valid request - GET', function(done){
      request.get('localhost:3000/api/note?id=123')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });
  });

//GET: test 400 should respond with 'bad request' if no id was provided in request
  describe('GET: /api/note', function(){
    it('return error with no id - GET', function(done){
      request.get('localhost:3000/api/note')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });
//GET: test 200 should contain response body for request made with valid id
  describe('GET: /api/note', function() {
    it('should return a note', function(done) {
      request.get(`localhost:3000/api/note?id=${note.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.restaurantname).to.equal('test restaurant name');
        expect(res.body.address).to.equal('test address');
        done();
      });
    });
  });
});
