'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe ('Student routes', () => {
  var student = null;

  describe('POST: /api/student', () => {
    it('Should return a student', done => {
      request
      .post('localhost:8080/api/student')
      .send({name: 'Steven', age: '30'})
      .end((err, response) => {
        if (err) return done(err);
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('Steven');
        expect(response.body.age).to.equal('30');
        student = response.body;
        done();
      });
    });
  });

  describe('GET: /api/student', () => {
    it ('Should return a student', done => {
      request
      .get(`localhost:8080/api/student?id=${student.id}`)
      .end((err, response) => {
        if (err) return done(err);
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('Steven');
        expect(response.body.age).to.equal('30');
        done();
      });
    });
  });

  describe('DELETE: /api/student', () => {
    it ('Should return a status of 204 with no content body', done => {

    });
  });
});
