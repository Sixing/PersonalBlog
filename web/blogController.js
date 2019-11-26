const timeUtil = require('../util/timeUtil');
const resUtil = require('../util/respUtil');
const blogDao = require('../dao/blogDao');
const tagsDao = require('../dao/tagDao');
const tagBlogMappingDao = require('../dao/tagBlogDaoMapping');
const url = require('url');
let path = new Map();

function queryBlogByPage(req, res) {
  const params = url.parse(req.url, true).query;
  blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), result => {
    result.forEach(item => {
      
      item.content = item.content.replace(/<img[\w\W]*">/g, "")
      item.content = item.content.replace(/<[\w\W]*>/g, "");
      item.content = item.content.substring(0, 300);
    })
    res.writeHead(200);
    res.write(resUtil.writeResult("success", '成功', result));
    res.end();
  })
}

function queryBlogCount(req, res) {
  blogDao.queryBlogCount(result => {
    res.writeHead(200);
    res.write(resUtil.writeResult("success", '成功', result[0]));
    res.end();
  })
}

function queryBlogById(req, res) {
  const params = url.parse(req.url, true).query;
  blogDao.queryBlogById(parseInt(params.bid), result => {
    res.writeHead(200);
    res.write(resUtil.writeResult("success", '成功', result[0]));
    res.end();
    blogDao.addViews(parseInt(params.bid), result => {
    })
  })
}

function editBlog(req, res) {
  const params = url.parse(req.url, true).query;
  const tags = params.tags.replace(/ /g,"").replace("，", ",");

  req.on('data', data => {
    blogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), result => {
      res.writeHead(200);
      res.write(resUtil.writeResult("success", "添加成功", null));
      res.end();

      const blogId = result.insertId;
      const tagList = tags.split(",");
      tagList.forEach(item => {
        if(item == "") {
          return
        }
        queryTag(item, blogId)
      })
    })
  })
}

// 插入文章后 检查标签是否存在，存在的话，创建标签和文章的映射，不存在的话则创建新标签
function queryTag(tag, blogId) {
  tagsDao.queryTag(tag, result => {
    if(result.length == 0 || result == null) {
      insertTag(tag, blogId)
    }else {
      tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(),() => {

      })
    }
  })
}

//没有标签的时候, 插入一个新标签和映射

function insertTag(tag, blogId) {
  tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), result => {
    if(result) {
      insertTagBlogMapping(result.insertId, blogId)
    }else {
      console.log('插入标签失败: 标签' + tag);
    }

  })
}

// 插入映射
function insertTagBlogMapping(tagId, blogId) {
  tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), result => {
  })
}

function queryAllBlog(req, res) {
  blogDao.queryAllBlog(result => {
    res.writeHead(200);
    res.write(resUtil.writeResult("success", "成功", result));
    res.end();
  })
}

function queryBlogByHot(req, res) {
  const params = url.parse(req.url, true).query
  blogDao.queryHot(parseInt(params.size), result => {
    res.writeHead(200);
    res.write(resUtil.writeResult("success", "成功", result));
    res.end();
  })
}

path.set("/editBlog", editBlog);
path.set('/queryBlogByPage', queryBlogByPage);
path.set('/queryBlogCount', queryBlogCount);
path.set('/queryBlogById', queryBlogById);
path.set('/queryAllBlog', queryAllBlog);
path.set('/queryBlogByHot', queryBlogByHot)

module.exports = {
  path
}