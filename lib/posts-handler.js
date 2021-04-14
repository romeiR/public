'use strict';
const pug = require('pug');
const Cookies = require('cookies');
const trackingIdKey = 'tracking_id';
let contents = [];
const fs = require('fs');
const readline = require('readline');
function handle(req,res){
  const cookies = new Cookies(req, res);
  addTrackingCookie(cookies);
  switch (req.method){
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      let irf = fs.readFileSync('./dairys.log','utf8');
      let line = irf.toString().split('\n');
      res.end(pug.renderFile('./views/dairy.pug',{contents : line}));
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
        fs.appendFileSync('./dairys.log',content,'utf8');
        fs.appendFileSync('./dairys.log','\n','utf8');
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

function addTrackingCookie (cookies) {
  if (!cookies.get(trackingIdKey)) {
    const trackingId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const tomorrow = new Date(Date.now() + (1000 * 60 * 60 * 24));
    cookies.set(trackingIdKey,trackingId, {expires: tomorrow});
  }
}

module.exports = {
  handle
};