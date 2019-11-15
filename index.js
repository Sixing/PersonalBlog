const express = require("express");
const url = require('url');
const fs = require('fs');
const globalConfig = require('./config');
const loader = require('./loader')


const app = new express();

app.use(express.static('./page/'));

app.post('/editEveryDay', loader.get('/editEveryDay'));
app.get('/queryEveryDay', loader.get('/queryEveryDay'));
app.post('/editBlog', loader.get('/editBlog'));
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'))

app.listen(globalConfig.port,() => {
  console.log("服务已启动, 端口:" + globalConfig.port);
});