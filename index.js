'use strict';
const http = require('http');
const router = require('./lib/router');
const auth = require('http-auth');
const basic = auth.basic({
  realm: 'Enter username and password.',
  file: './users.passwd'
});


const server = http
<<<<<<< HEAD
  .createServer((req, res) => {
    router.route(req, res);
=======
  .createServer(basic,(req, res) => {
    router.route(req,res);
>>>>>>> sub
  })
  .on('error', e => {
    console.error('Server Error', e);
  })
  .on('clientError', e => {
    console.error('Client Error', e);
  });

const port = 8000;
server.listen(port, () => {
  console.info('Listening on ' + port);
});