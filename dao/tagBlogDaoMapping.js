const dbUtil = require('./dbUtil');


function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {

  const inserSql = "insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values (?,?,?,?);";
  const params = [tagId, blogId, ctime, utime];
  const connection = dbUtil.createConnect();
  connection.connect();
  connection.query(inserSql, params, (err, result) => {
    if(result) {
      success(result)
    }else {
      console.log(err)
    }
  })
  connection.end();
}

function queryByTag(tagId, page, pageSize, success) {
  const inserSql = "select * from tag_blog_mapping where tag_id = ? limit ?, ?;";
  const params = [tagId, page * pageSize, pageSize];
  const connection = dbUtil.createConnect();
  connection.connect();
  connection.query(inserSql, params, (err, result) => {
    if(result) {
      success(result)
    }else {
      console.log(err)
    }
  })
  connection.end();
}

function queryByTagCount(tagId,success) {
  const inserSql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
  const params = [tagId];
  const connection = dbUtil.createConnect();
  connection.connect();
  connection.query(inserSql, params, (err, result) => {
    if(result) {
      success(result)
    }else {
      console.log(err)
    }
  })
  connection.end();
}

module.exports = {
  insertTagBlogMapping,
  queryByTag,
  queryByTagCount
}