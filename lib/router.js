'use strict';
const postsHandler = require('./posts-handler');
const util = require('./handler-util');
const  homeHandler  = require('./home-handler');

<<<<<<< HEAD
function route(req, res) {
  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/logout':
      // TODO ログアウト処理
      break;
    default:
=======
function route (req,res){
  switch (req.url){
    case '/home/dairy':
      postsHandler.handle(req,res);
      break;
    case '/home':
      homeHandler.home(req,res);
      break;
    case '/logout':
      util.handleLogout(req,res);
>>>>>>> sub
      break;
    default:
      util.handleFound(req,res);
  }
}

module.exports = {
  route
};