const dbUtil = require('./dbUtil');

function insertComment(blogId, parent, parentName, userName, email, comments, ctime, utime, success) {
  const insertSql = "insert into comments (blog_id, parent, parent_name, user_name, email, comment, ctime, utime) values (?, ?, ?, ?, ?, ?, ?, ?);";
  const params = [blogId, parent, parentName, userName, email, comments, ctime, utime];

  const connection = dbUtil.createConnect();
  connection.connect();
  connection.query(insertSql, params, (err, result)=> {
    if(result) {
      success(result)
    }else {
      console.log(err)
    }
  })
  connection.end();
}

function queryCommentsByBlogId(blogId, success) {
  const querySql = "select * from comments where blog_id = ?;";
  const params = [blogId];
  const connection = dbUtil.createConnect();
  connection.connect();
  connection.query(querySql, params, (err, result)=> {
    if(result) {
      success(result)
    }else {
      console.log(err)
    }
  })
  connection.end();
}

function queryCommentsCountByBlogId(blogId, success) {
  const querySql = "select count(1) as count from comments where blog_id = ?;";
  const params = [blogId];
  const connection = dbUtil.createConnect();
  connection.connect();
  connection.query(querySql, params, (err, result)=> {
    if(result) {
      success(result)
    }else {
      console.log(err)
    }
  })
  connection.end();
}

function queryNewComments(size, success) {
  const querySql = "select * from comments order by id desc limit ?;";
  const connection = dbUtil.createConnect();
  connection.connect();
  connection.query(querySql, [size], (err, result)=> {
    if(result) {
      success(result)
    }else {
      console.log(err)
    }
  })
  connection.end();
}

module.exports = {
  insertComment,
  queryCommentsByBlogId,
  queryCommentsCountByBlogId,
  queryNewComments
}