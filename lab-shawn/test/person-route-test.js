'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const PORT = process.env.PORT || 3000;


require('../server.js');

describe('Person Routes', function(){
  var person = null;

  describe('POST: /api/person', function(){
    it('should return a person', function(done){
      request.post(`localhost:${PORT}/api/person`)
      .send({name:'test name', gender:'male'})
      .end((err,res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        person = res.body;
        done();
      });
    });
    it('should return bad request', function(done){
      request.post(`localhost:${PORT}/api/person`)
      .send({name:'test name'})
      .end((err) => {
        expect(err.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/person', function(){
    it('should return with person', function(done){
      request.get(`localhost:${PORT}/api/person?id=${person.id}`)
      .end((err,res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        person = res.body;
        done();
      });
    });
    it('should return not found', function(done){
      request.get(`localhost:${PORT}/api/person?id=123`)
      .end((err) => {
        expect(err.status).to.equal(404);
        done();
      });
    });
    it('should return bad request', function(done){
      request.get(`localhost:${PORT}/api/person`)
      .end((err) => {
        expect(err.status).to.equal(400);
        done();
      });
    });
  });
  describe('DELETE: /api/person', function(){
    it('should return with 404', function(done){
      request.get(`localhost:${PORT}/api/person?id=123`)
      .end((err) => {
        expect(err.status).to.equal(404);
        done();
      });
    });
    it('should return with 204', function(done){
      request.get(`localhost:${PORT}/api/person?id=00b17950-c35b-11e6-91c0-2f447f841b80`)
      .end((err) => {
        expect(err.status).to.equal(204);
        done();
      });
    });
  });
});
