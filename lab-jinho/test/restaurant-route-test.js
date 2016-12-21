'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Restaurant = require('../model/restaurant.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleRestaurant = {
  restaurantname: 'red robin',
  address: 'seattle, wa'
};

describe('Restaurant Routes', function() {

  describe('GET: /api/restaurant', function() {
    describe('with a valid id', function() {
      before( done => {
        Restaurant.createRestaurant(exampleRestaurant)
        .then(restaurant => {
          this.tempRestaurant = restaurant;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Restaurant.deleteRestaurant(this.tempRestaurant.id)
        .then( ()=> done())
        .catch( err => done(err));
      });

      it('should return restaurant', done => {
        request.get(`${url}/api/restaurant/${this.tempRestaurant.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempRestaurant.id);
          expect(res.body.restaurantname).to.equal(this.tempRestaurant.restaurantname);
          expect(res.body.address).to.equal(this.tempRestaurant.address);
          done();
        });
      });

      describe('with invalid id', function() {
        it('should respond with 404 status code', done => {
          request.get(`${url}/api/restaurant/123`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/restaurant', function() {
    describe('with valid body', function() {
      after( done => {
        if (this.tempRestaurant) {
          Restaurant.deleteRestaurant(this.tempRestaurant.id)
          .then( ()=> done())
          .catch( err => done(err));
        }
      });

      it('should return restaurant', done => {
        request.post(`${url}/api/restaurant`)
        .send(exampleRestaurant)
        .end((err, res) => {
          if (err) return done (err);
          expect(res.status).to.equal(200);
          expect(res.body.restaurantname).to.equal(exampleRestaurant.restaurantname);
          expect(res.body.address).to.equal(exampleRestaurant.address);
          this.tempRestaurant = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/restaurant', function() {
    describe('with valid id and body', function() {
      before( done => {
        Restaurant.createRestaurant(exampleRestaurant)
        .then( restaurant => {
          this.tempRestaurant = restaurant;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if (this.tempRestaurant) {
          Restaurant.deleteRestaurant(this.tempRestaurant.id)
          .then( ()=> done())
          .catch(done);
        }
      });

      it('should return restaurant', done => {
        let updateRestaurant = { restaurantname: 'new restaurant name', address: 'new address'};
        request.put(`${url}/api/restaurant?id=${this.tempRestaurant.id}`)
        .send(updateRestaurant)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempRestaurant.id);
          for (var prop in updateRestaurant) {
            expect(res.body[prop]).to.equal(updateRestaurant[prop]);
          }
          done();
        });
      });
    });
  });
});
