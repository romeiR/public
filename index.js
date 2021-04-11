'use strict';
const http = require('http');
const router = require('./lib/router');
const server = http
  .createServer((req, res) => {
    router.route(req,res);
    res.end();
  })
  .on('error', e => {
    console.error('Server Error', e);
  })
  .on('clientError', e => {
    console.error('Client Error', e);
  });

const port = 8000;
server.listen(port, () => {
  console.info(`ポート ${port} でサーバーを起動しました`);
});