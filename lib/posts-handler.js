'use strict';
function handle(req,res){
  switch (req.method){
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end("<h1>ここに自分の日記を書きます</h1>");
      break;
    case 'POST':
      //他の人のコメント
      break;
    default:
      break;
  }
}

module.exports = {
  handle
};