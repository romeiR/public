'use strict';
const pug = require('pug');
const contents = [];
function handle(req,res){
  switch (req.method){
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(pug.renderFile('./views/dairy.pug',{contents : contents}));
      break;
    case 'POST':
      let body = [];
      req.on('data',(chunk) => {
        body.push(chunk);
      }).on('end',() => {
        body =Buffer.concat(body).toString();
        const decoded = decodeURIComponent(body);
        const content = decoded.split('content=')[1];
        console.info(`[${content}] がコメントされました`);
        contents.push(content);
        handleRedirectPosts(req,res);
      });
      break;
    default:
      break;
  }
}

function handleRedirectPosts(req, res) {
  res.writeHead(303, {
    'Location': '/home/dairy'
  });
  res.end();
}

module.exports = {
  handle
};