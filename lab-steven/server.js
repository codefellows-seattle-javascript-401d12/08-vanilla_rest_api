'use strict';

const http = require('http');
const Student = require('./model/student-constructor.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 8080;
const router = new Router();

router.get('/api/student', (request, response) => {
  if (request.url.query.id) {
    storage.getItem('student', request.url.query.id)
    .then(student => {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.write(JSON.stringify(student));
      response.end();
    })
    .catch(err => {
      console.error(err);
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('Student not found.');
      response.end();
    });
    return;
  }
});

router.post('/api/student', (request, response) => {
  try {
    var student = new Student(request.body.name, request.body.content);
    storage.createItem('student', student);
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(student));
    response.end();
  } catch(err) {
    console.error(err);
    response.writeHead(400, {'Content-Type': 'text/plain'});
    response.write('Bad request.');
    response.end();
  }
});

const server = http.createServer();

server.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
