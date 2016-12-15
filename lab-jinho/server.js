'use strict';

//**DEPENDENCIES**
//node modules
const http = require('http');
//npm modules

//custom modules
const Note = require('./model/note.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
//environment variables
const PORT = process.env.PORT || 3000;
//module constants
const router = new Router();

//Logic: Method: GET
router.get('/api/note', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('note', req.url.query.id)
    .then( note => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(note));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });

    return;
  };

  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

//Logic: Method: POST
router.post('/api/note', function(req, res) {
  try {
    var note = new Note(req.body.name, req.body.content);
    storage.createItem('note', note);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(note));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  };
});

//Logic: Method: DELETE
router.delete('/api/note', function(req, res) {
  if (req.url.query.id) {
    storage.deleteItem('note', req.url.query.id)
    .then(() => {
      res.writeHead(204, {'Content-Type': 'application/json'});
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain',});
  res.write('bad request');
  res.end();
});


//**START SERVER**
const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server up:', PORT);
});
