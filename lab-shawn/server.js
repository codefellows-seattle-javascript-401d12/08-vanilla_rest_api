'use strict';

const http = require('http');
const Person = require('./model/person.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;

const router = new Router();

router.get('/api/person', function(req,res){
  if(!req.url.query.id){
    res.writeHead(400,{'Content-Type':'text/plain'});
    res.write('bad request');
    res.end();
  }
  if(req.url.query.id){
    storage.fetchPerson('person',req.url.query.id)
    .then( person => {
      res.writeHead(200, {'Content-Type':'application/json'});
      res.write(JSON.stringify(person));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404,{'Content-Type':'text/plain'});
      res.write('person not found');
      res.end();
    });
    return;
  }
});

router.post('/api/person',function(req,res){
  try{
    var person = new Person(req.body.name,req.body.gender);
    storage.createPerson('person',person);
    res.writeHead(200, {'Content-Type':'application/json'});
    res.write(JSON.stringify(person));
    res.end();
  }catch(err){
    console.error(err);
    res.writeHead(400, {'Content-Type':'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/person', function(req,res){
  if(req.url.query.id){
    storage.deletePerson('person',req.url.query.id)
    .then(person => {
      res.writeHead(204,{'Content-Type':'application/json'});
      res.write('Person Removed');
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404,{'Content-Type': 'text/plain'});
      res.write('person not found');
      res.end();
    });
  }
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('Served On:', PORT);
});
