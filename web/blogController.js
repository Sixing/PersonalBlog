const timeUtil = require('../util/timeUtil');
const resUtil = require('../util/respUtil');
const blogDao = require('../dao/blogDao');
const tagsDao = require('../dao/tagDao');
const tagBlogMappingDao = require('../dao/tagBlogDaoMapping');
const url = require('url');
let path = new Map();

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

path.set("/editBlog", editBlog)

module.exports = {
  path
}