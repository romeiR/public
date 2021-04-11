'use strict';
const { read } = require('pug-load');
const postsHandler = require('./posts-handler');

function route (req,res){
  switch (req.url){
    case '/posts':
      postsHandler.handle(req,res);
      break;
    case '/logout':
      //ログアウト処理を作る
      break;
  }
}

module.exports = {
  route
};