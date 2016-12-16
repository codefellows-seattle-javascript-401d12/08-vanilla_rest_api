'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const PORT = process.env.PORT || 8000;
const router = new Router();

require('./route/dog-route.js')(router);

// router.delete('/api/dog', function(req, res) {
//   if(req.url.query.id) {
//     storage.deleteItem('dog', req.url.query.id)
//     .then( dog => {
//       res.writeHead(204, {
//         'Content-Type': 'application/json'
//       });
//       res.write(JSON.stringify(dog));
//       res.end();
//     })
//     .catch(err => {
//       console.error(err);
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       });
//       res.write('dog not found');
//       res.end();
//     });
//     return;
//   }
// });

const server = http.createServer(router.route());
server.listen(PORT, () => {
  console.log('Server up:', PORT);
});
