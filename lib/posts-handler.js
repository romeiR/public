'use strict';
const pug = require('pug');
const Cookies = require('cookies');
const trackingIdKey = 'tracking_id';
let contents = [];
let users = [];
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
      let con_line = fs.readFileSync('./user&pass/dairys.log','utf8');
      let content_line = con_line.toString().split('\n');
      let use_line = fs.readFileSync('./user&pass/users.log','utf8');
      let users_line = use_line.toString().split('\n');
      res.end(pug.renderFile('./views/dairy.pug',{
        ID_now : req.user,
        contents : content_line,
        ID_name : users_line,
        ID_sec : cookies.get(trackingIdKey)
      }));
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
        users.push(req.user);
        fs.appendFileSync('./user&pass/dairys.log',content,'utf8');
        fs.appendFileSync('./user&pass/dairys.log','\n','utf8');
        fs.appendFileSync('./user&pass/users.log',req.user,'utf8');
        fs.appendFileSync('./user&pass/users.log','\n','utf8');
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