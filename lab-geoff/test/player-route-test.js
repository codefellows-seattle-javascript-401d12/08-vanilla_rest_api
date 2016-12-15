'use route';

const request = require('superagent');
const expect  = require('chai').expect;

describe('Player Routes', function() {
  var player = null;

  describe('POST: /api/player', function() {
    it('should return a player', function(done) {
      let name = { first: 'Geoff', last: 'Simons'};
      let email = 'geoff@example.com';
      console.log('Trying to send a player');
      request.post('localhost:5555/api/player')
      .send({ name: name, email: email})
      .end( (err, res) => {
        if(err) return done(err);
        console.log(res);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.deep.equal(name);
        expect(res.body.email).to.equal(email);
        expect(res.body.id).to.be.ok; //TODO: More specific?
        player = res.body;
        done();
      });
    });
  });

  describe('GET: /api/player', function() {
    it('should return a player', function(done) {
      request.get(`localhost:5555/api/player?id=${player.id}`)
      .end( (err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(player);
        done();
      });
    });
  });

});
