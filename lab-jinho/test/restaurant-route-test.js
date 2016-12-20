'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Restaurant Routes', function() {
  var restaurant = null;

//POST: test 400 should respond with 'bad request' if no request body was provided or body was invalid
  describe('POST: /api/restaurant', function(){
    it('respond with bad request - POST', function(done){
      request.post('localhost:3000/api/restaurant')
      .send({invalid:'invalid body'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('BadRequestError');
        done();
      });
    });
  });
//POST: test 200 should respond with the body content for post request with valid body
  describe('POST: /api/restaurant', function() {
    it('should return a restaurant', function(done) {
      request.post('localhost:3000/api/restaurant')
      .send({restaurantname: 'test restaurant name', address: 'test address'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.restaurantname).to.equal('test restaurant name');
        expect(res.body.address).to.equal('test address');
        restaurant = res.body;
        done();
      });
    });
  });
//GET: test 404 should respond with 'not found' for valid requests made with id not found
  describe('GET: /api/restaurant', function(){
    it('return error for no id valid request - GET', function(done){
      request.get('localhost:3000/api/restaurant?id=123')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('NotFoundError');
        done();
      });
    });
  });
//GET: test 400 should respond with 'bad request' if no id was provided in request
  describe('GET: /api/restaurant', function(){
    it('return error with no id - GET', function(done){
      request.get('localhost:3000/api/restaurant')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('BadRequestError');
        done();
      });
    });
  });
//GET: test 200 should contain response body for request made with valid id
  describe('GET: /api/restaurant', function() {
    it('should return a restaurant', function(done) {
      request.get(`localhost:3000/api/restaurant?id=${restaurant.id}`)
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
