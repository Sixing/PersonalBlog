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
app.get('/queryBlogCount', loader.get('/queryBlogCount'))
app.get('/queryBlogById', loader.get('/queryBlogById'))
app.get('/addComment', loader.get('/addComment'))
app.get('/queryRandomCode', loader.get('/queryRandomCode'))
app.get('/queryCommentsByBlogId', loader.get('/queryCommentsByBlogId'))
app.get('/queryCommentsCountByBlogId', loader.get('/queryCommentsCountByBlogId'))
app.get('/queryAllBlog', loader.get('/queryAllBlog'))
app.get('/queryRandomTags', loader.get('/queryRandomTags'))
app.get('/queryBlogByHot', loader.get('/queryBlogByHot'))
app.get('/queryNewComments', loader.get('/queryNewComments'))
app.get('/queryByTag', loader.get('/queryByTag'))
app.get('/queryByTagCount', loader.get('/queryByTagCount'))
app.get('/queryBlogBySearch', loader.get('/queryBlogBySearch'))

app.listen(globalConfig.port,() => {
  console.log("服务已启动, 端口:" + globalConfig.port);
});