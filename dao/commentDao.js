const dbUtil = require('./dbUtil');

function insertComment(blogId, parent, userName, email, comments, ctime, utime, success) {
  const insertSql = "insert into comments (blog_id, parent, user_name, email, comment, ctime, utime) values (?, ?, ?, ?, ?, ?, ?);";
  const params = [blogId, parent, userName, email, comments, ctime, utime];
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

module.exports = {
  insertComment
}