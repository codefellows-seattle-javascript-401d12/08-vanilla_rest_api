'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Restaurantlist = require('../model/restaurantlist.js');
const Restaurant = require('../model/restaurant.js');

const PORT = process.env.PORT || 3000;

process.env.MONGODB_URI = 'mongodb://localhost/restaurantlisttest';

require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleRestaurantlist = {
  restaurantname: 'test name'
  timestamp: new Date()
};

const exampleRestaurant = {
  restaurantname: 'test restaurant name'
  timestamp: new Date()
};

describe('Restaurantlist Routes', function() {
  describe('POST: /api/restaurantlist', function() {
    describe('with valid body', function() {
      after( done => {
        if (this.tempRestaurantlist) {
          Restaurantlist.remove({})
          .then( ()=> done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return restaurantlist', done => {
        request.post(`${url}/api/restaurantlist`)
        .send(exampleRestaurantlist)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.restaurantname).to.equal('test restaurant name');
          this.tempRestaurantlist = res.body;
          done();
        });
      });
    });
  });

  describe('GET: /api/list/:id', function() {
    describe('with valid body', function() {
      before( done => {
        exampleRestaurantlist.timestamp = new Date();
        new Restaurantlist(exampleRestaurantlist).save()
        .then( list => {
          this.tempRestaurantlist = list;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleRestaurantlist.timestamp;
        if(this.tempRestaurantlist) {
          Restaurantlist.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return restaurantlist', done => {
        request.get(`${url}/api/restaurantlist/${this.tempRestaurantlist._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.restaurantname).to.equal('test restaurant name');
          done();
        });
      });
    });
  });
});
