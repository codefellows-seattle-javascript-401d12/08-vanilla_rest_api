'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Restaurantlist = require('../model/restaurantlist.js');
const PORT = process.env.PORT || 3000;
// const MONGODB_URI = 'mongodb://localhost/restaurantlist';

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleRestaurantlist = {
  restaurantname: 'red robin',
};

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
      request.put(`${url}/api/restaurantlist`)
      .send(exampleRestaurantlist)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.restaurantname).to.equal('red robin');
        this.tempRestaurantlist = res.body;
        done();
      });
    });
  });
});
