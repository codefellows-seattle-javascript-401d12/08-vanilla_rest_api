'use strict';

const Student = require('../model/student-constructor.js');
const storage = require('../lib/storage.js');
const respond = require('../lib/respond.js');

module.exports = function(router) {
  router.get('/api/student', (request, response) => {
    if (request.url.query.id) {
      storage.getItem('student', request.url.query.id)
      .then(student => {
        respond.sendJSON(response, 200, student);
      })
      .catch(err => {
        respond.sendText(response, 404, 'Student not found.', err);
      });
      return;
    }
    storage.getAllItems()
    .then(allIds => {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.write(JSON.stringify(allIds));
      response.end();
    });
  });

  router.post('/api/student', (request, response) => {
    var student = new Student(request.body);
    storage.createItem('student', student)
    .then(student => {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.write(JSON.stringify(student));
      response.end();
    })
    .catch(err => {
      console.error(err);
      response.writeHead(400, {'Content-Type': 'text/plain'});
      response.write('Bad request.');
      response.end();
    });
  });

  router.delete('/api/student', (request, response) => {
    if (request.url.query.id) {
      storage.deleteItem('student', request.url.query.id)
      .then(() => {
        response.writeHead(204);
        response.end();
      })
      .catch(err => {
        console.error(err);
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('Student not found.');
      });
      return;
    }
  });
};
