'use strict';
const { isModuleDeclaration } = require('babel-types');
const pug = require('pug');

function home (req,res) {
  res.writeHead(200,{
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end(pug.renderFile('./views/home.pug'));
}

 module.exports = {
   home
 }