'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Person Routes', function(){
  var person = null;

  describe('POST: /api/person', function(){
    it('should return a person', function(done){
      request.post('localhost:8000/api/person')
      .send({name:'test name', gender:'male'})
      .end((err,res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        person = res.body;
        done();
      });
    });
    it('should return bad request', function(done){
      request.post('localhost:8000/api/person')
      .send({name:'test name'})
      .end((err) => {
        expect(err.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/person', function(){
    it('should return with person', function(done){
      request.get(`localhost:8000/api/person?id=${person.id}`)
      .end((err,res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        person = res.body;
        done();
      });
    });
    it('should return not found', function(done){
      request.get('localhost:8000/api/person?id=123')
      .end((err) => {
        expect(err.status).to.equal(404);
        done();
      });
    });
    it('should return bad request', function(done){
      request.get('localhost:8000/api/person')
      .end((err) => {
        expect(err.status).to.equal(400);
        done();
      });
    });
  });
});
