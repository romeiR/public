'use strict';
const postsHandler = require('./posts-handler');

function route (req,res){
  switch (req.url){
    case '/dairy':
      postsHandler.handle(req,res);
      break;
    case '/home':
      //ホームを作る
      break;
    case 'logout':
      //ログアウト処理を作る
      break;
  }
}

module.exports = {
  route
};