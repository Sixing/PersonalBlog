const timeUtil = require('../util/timeUtil');
const resUtil = require('../util/respUtil');
const commentDao = require('../dao/commentDao');
const captcha = require('svg-captcha');
const url = require('url');
let path = new Map();


function addComment(req, res) {
  const params = url.parse(req.url, true).query;
  commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(),result => {
    res.writeHead(200);
    res.write(resUtil.writeResult("success", '评论成功', result));
    res.end();
  })
}

function queryRandomCode(req, res) {
  const img = captcha.create({
    fontSize: 50, 
    width: 100,
    height: 34
  });
  res.writeHead(200);
  res.write(resUtil.writeResult("success", '评论成功', img));
  res.end();
}


path.set('/addComment', addComment);
path.set('/queryRandomCode', queryRandomCode)

module.exports = {
  path
}
