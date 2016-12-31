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

describe('Restaurant Routes', function() {
  describe('POST: /api/list/:listID/restaurant', function() {
    describe('with valid list id and restaurant body', () => {
      before( done => {
        new List(exampleList).save()
        .then( list => {
          this.tempList = list;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          List.remove({}),
          Restaurant.remove({})
        ])
        .then(() => done())
        .catch(done);
      });

      it('should return restaurant', done => {
        request.post(`${url}/api/list/${this.tempList.id}/restaurant`)
        .send(exampleRestaurant)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.restaurantname).to.equal(exampleRestaurant.restaurantname);
          expect(res.body.listID).to.equal(this.tempList._id.toString());
          done();
        });
      });
    });
  });
});
