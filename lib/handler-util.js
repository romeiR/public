'use strict';

const { isModuleDeclaration } = require("babel-types");

function handleLogout (req,res) {
  res.writeHead (401, {
    'Content-Type': 'text/plain;charset=utf-8'
  });
  res.end("ログアウトしました");
}

function handleFound (req,res) {
  res.writeHead (404, {
    'Content-Type': 'text/plain; charset=utf-8'
  })
  res.end("このページはまだ開発途中か存在しないページです。URLがあっているかどうか確認してください。");
}

module.exports = {
  handleLogout,
  handleFound
}