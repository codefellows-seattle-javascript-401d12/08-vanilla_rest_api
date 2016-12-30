'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const List = require('../model/list.js');
const Restaurant = require('../model/restaurant.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleList = {
  name: 'test list',
  timestamp: new Date()
};

const exampleRestaurant = {
  restaurantname: 'test restaurant',
  address: 'test address'
};

describe('List Routes', function() {
  describe('POST: /api/list', function() {
    describe('with valid body', function() {
      after( done => {
        if (this.tempList) {
          List.remove({})
          .then( ()=> done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return list', done => {
        request.post(`${url}/api/list`)
        .send(exampleList)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test list');
          this.tempList = res.body;
          done();
        });
      });
    });
  });

  describe('GET: /api/list/:id', function() {
    describe('with valid body', function() {
      before( done => {
        new List(exampleList).save()
        .then( list => {
          this.tempList = list;
          return List.findByIdAndAddRestaurant(list._id, exampleRestaurant);
        })
        .then( restaurant => {
          this.tempRestaurant = restaurant;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempList) {
          List.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return list', done => {
        request.get(`${url}/api/list/${this.tempList._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test list');
          expect(res.body.restaurants.length).to.equal(1);
          expect(res.body.restaurants[0].restaurantname).to.equal(exampleRestaurant.restaurantname);
          done();
        });
      });
    });
  });

  describe('PUT: /api/list/:id', function() {
    describe('with valid body', function() {
      before( done => {
        new List(exampleList).save()
        .then( list => {
          this.tempList = list;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempList) {
          List.remove({})
          .then( () => done ())
          .catch(done);
          return;
        }
        done();
      });

      it('should return list', done => {
        var updated = { name: 'updated name' };

        request.put(`${url}/api/list/${this.tempList._id}`)
        .send(updated)
        .end((err, res) => {
          if (err) return done (err);
          let timestamp = new Date(res.body.timestamp);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(updated.name);
          expect(timestamp.toString()).to.equal(exampleList.timestamp.toString());
          done();
        });
      });
    });
  });
});
