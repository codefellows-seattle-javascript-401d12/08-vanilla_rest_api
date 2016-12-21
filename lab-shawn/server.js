'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('person:server');

const app = express();
const Person = require('./model/person.js');
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.post('/api/person', jsonParser, function(req,res,next){
  debug('POST: /api/person');

  Person.createPerson(req.body)
  .then(person => res.json(person))
  .catch(err => next(err));
});

app.get('/api/person', function(req,res,next){
  debug('GET: /api/person');

  Person.fetchPerson(req.query.id)
  .then(person => res.json(person))
  .catch(err => next(err));
});

app.delete('/api/person', function(req,res,next){
  debug('DELETE: /api/person');

  Person.deletePerson(req.query.id)
  .then(() => res.status(204).send())
  .catch(err => next(err));
});

//eslint-disable-next-line
app.use(function(err,req,res,next){
  debug('error middleware');

  if(err.status){
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  err.status(err.status).send(err.name);
});

app.listen(PORT, function(){
  console.log(`served on port: ${PORT}`);
});
