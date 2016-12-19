'use strict';

const consoleLog = require(`${__dirname}/../.console.js`);

module.exports = function(req) {
  consoleLog('Run parseJSON function');
  return new Promise( (resolve, reject) => {
    if(req.method === 'POST' || req.method === 'PUT') {
      consoleLog('Run parseJSON function IF conditional');
      var body = '';

      req.on('data', data => {
        body += data.toString();
      });

      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          resolve(req);
        } catch(err) {
          console.error(err);
          reject(err);
        }
      });

      req.on('error', err => {
        console.error(err);
        reject(err);
      });

      return;
    }
    consoleLog('SKIP parseJSON function IF conditional and just run resolve function');
    resolve();
  });
};
