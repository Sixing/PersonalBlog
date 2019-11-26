const timeUtil = require('../util/timeUtil');
const resUtil = require('../util/respUtil');
const blogDao = require('../dao/blogDao');
const tagsDao = require('../dao/tagDao');
const tagBlogMappingDao = require('../dao/tagBlogDaoMapping');
const url = require('url');
let path = new Map();

function queryRandomTags(req, res) {
  tagsDao.queryAllTag(result => {
    result.sort(() => {
      return Math.random() > 0.5 ? true : false
    })
    res.writeHead(200);
    res.write(resUtil.writeResult("success", '成功', result));
    res.end();
  })
}

function queryByTag(req, res) {
  const params = url.parse(req.url, true).query;
  tagsDao.queryTag(params.tag, result => {
      if(result == null || result.length == 0) {
        res.writeHead(200);
        res.write(resUtil.writeResult("success", '成功', result));
        res.end();
      }else {
        tagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize) ,result => {
          let blogList = [];
          result.forEach(item => {
            blogDao.queryBlogById(item.blog_id, blogResult => {
              blogList.push(blogResult[0]) ;
            });
          })
          getResult(blogList, result.length, res);
        })
      }
      
  })
}

function getResult(blogList, len, res) {
  if(blogList.length < len) {
    setTimeout(() => {
      getResult(blogList, len, res)
    },10)
  }else {
    res.writeHead(200);
    res.write(resUtil.writeResult("success", '成功', blogList));
    res.end();
  }
}

function queryByTagCount(req, res) {
  const params = url.parse(req.url, true).query;
  tagsDao.queryTag(params.tag, result => {
    tagBlogMappingDao.queryByTagCount(result[0].id, result => {
      res.writeHead(200);
      res.write(resUtil.writeResult("success", '成功', result));
      res.end();
    })
  })
}

path.set("/queryRandomTags", queryRandomTags);
path.set('/queryByTag', queryByTag);
path.set('/queryByTagCount', queryByTagCount);
path.set('/queryByTagCount', queryByTagCount)

module.exports = {
  path
}