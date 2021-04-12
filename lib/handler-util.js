'use strict';
const pug = require('pug');
const { isModuleDeclaration } = require("babel-types");

function handleLogout (req,res) {
  res.writeHead (401, {
    'Content-Type': 'text/plain;charset=utf-8'
  });
  res.end("ログアウトしました");
}

function handleFound (req,res) {
  res.writeHead (404, {
    'Content-Type': 'text/html; charset=utf-8'
  })
  res.end(pug.renderFile('./views/found.pug'));
}

module.exports = {
  handleLogout,
  handleFound
}