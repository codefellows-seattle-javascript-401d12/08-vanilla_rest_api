'use strict';


const http = require('http');
const PORT = 3000;

const Router = require('./lib/router.js');
const Note = require('./model/note.js');
const storage = require('./lib/storage.js');
const router = new Router();
const server = http.createServer(router.route());

router.get('/api/note', function(req,res){
  if(req.url.query.id){
    storage.fetchItem('note', req.url.query.id)
    .then(note => {
      if(!note.id){
        res.writeHead(204, {'Content-Type': 'text/plain'});
        res.write('no content in the body');
        res.end();
      }
      if(note.id){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(note));
        res.end();
      }
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('not found');
      res.end();
    });
    return;
  }
});

router.post('/api/note', function(req,res){
  try{
    var note = new Note(req.body.name, req.body.content, req.body.favFood, req.body.place);
    storage.createItem('note', note);
    res.writeHead(200, {
      'Content-Type' : 'application/json'
    });
    res.write(JSON.stringify(note));
    res.end();
  } catch(err){
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/note', function(req,res){
  if(req.url.query.id){
    storage.fetchDel('note', req.url.query.id)
     .then(() => {
       res.writeHead(200,{
         'Content-Type': 'text/plain'
       });
       res.write('item deleted!');
       res.end();
     } )
     .catch(err => {
       console.error(err);
       res.writeHead(404,{
         'Content-Type':'text/plain'
       });
       res.write('not found');
       res.end();
     });
    return;
  }
});

router.put('/api/note', function(req,res){
  if(req.body.id){
    try{
      var note = new Note(req.body.name, req.body.content, req.body.favFood, req.body.place);
      storage.put('note', req.body.id, note);
      res.writeHead(200, {
        'Content-Type' : 'application/json'
      });
      res.write(JSON.stringify(note));
      res.end();
    }
    catch(err){
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write('bad request');
      res.end();
    }
  }
});

server.listen(PORT, function(){
  console.log('server is on!!');
});
