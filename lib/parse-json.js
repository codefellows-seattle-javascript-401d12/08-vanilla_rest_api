'use strict';

module.exports = function(req) {
  return new Promise( (resolve, reject) => {
    if(req.method === 'POST' || req.method === 'PUT') {
      var body = '';

      req.on('data', data => {
        body += data.toString();
      });

      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          console.log('parse-json.js 15 ==========================\r\n', req.body);
          resolve(req);
        } catch(err) {
          console.log('parse-json.js 18 ==========================\r\n', err);
          console.error(err);
          reject(err);
        }
      });

      req.on('error', err => {
        console.log('parse-json.js 25 ==========================\r\n', err);
        // console.error(err);
        reject(err);
      });

      return;
    }

    resolve();
  });
};
