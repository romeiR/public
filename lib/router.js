'use strict';
const { read } = require('pug-load');
const postsHandler = require('./posts-handler');
const util = require('./handler-util');

function route (req,res){
  switch (req.url){
    case '/home/dairy':
      postsHandler.handle(req,res);
      break;
    case '/home':
      break;
    case '/logout':
      util.handleLogout(req,res);
      break;
    default:
      util.handleFound(req,res);
  }
}

module.exports = {
  route
};