'use strict';

module.exports = function(req) {
  return new Promise( (resolve, reject) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      console.log(req.method);
      var tempBody = '';

      req.on('data', data => {
        tempBody += data.toString();
      });

      req.on('end', () => {
        try {
          console.log(tempBody);
          req.body = JSON.parse(tempBody);
          resolve(req);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });

      req.on('error', err => {
        console.error(err);
        reject(err);
      });
    }
    else resolve('');
  });
};
