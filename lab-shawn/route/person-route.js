'use strict';

const storage = require('../lib/storage.js');
const Person = require('../model/person.js');
const response = require('../lib/response.js');

module.exports = function(router){
  router.get('/api/person', function(req,res){
    if(req.url.query.id){
      storage.fetchPerson('person',req.url.query.id)
      .then( person => {
        response.sendJSON(res,200,person);
      })
      .catch(err => {
        console.error(err);
        response.sendText(res,404,'person not found');
      });
      return;
    }
    response.sendText(res,400,'bad request');
  });

  router.post('/api/person',function(req,res){
    try{
      var person = new Person(req.body.name,req.body.gender);
      storage.createPerson('person',person);
      response.sendJSON(res,200,person);
    }catch(err){
      console.error(err);
      response.sendText(res,400,'bad request');
    }
  });

  router.delete('/api/person', function(req,res){
    if(req.url.query.id){
      storage.deletePerson('person',req.url.query.id)
      .then( ()=> {
        response.sendJSON(res,204,'person removed');
      })
      .catch(err => {
        console.error(err);
        response.sendText(res,404,'person not found');
      });
    }
  });
};
