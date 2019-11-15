const dbUtil = require('./dbUtil');


function queryBlogByPage( page, pageSize, success) {
  const querySql = "select * from blog order by id desc limit ?, ?;";
  const params = [page * pageSize, pageSize];
  const connection = dbUtil.createConnect();
  connection.connect();
  connection.query(querySql, params, (err, result) => {
    if(result) {
      success(result)
    }else {
      console.log(err)
    }
  })
  connection.end();
}

function insertBlog(title, content, tags, views ,ctime, utime, success) {
  const inserSql = "insert into blog (title, content, tags, views ,ctime, utime) values (?,?,?,?,?,?);";
  const params = [title, content, tags, views ,ctime, utime];
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


function queryBlog(success) {
  const querySql = "select * from blog order by id desc limit 1;";

  const connection = dbUtil.createConnect();
  connection.connect();
  connection.query(querySql, [] ,(err, result) => {
    if(result) {
      success(result)
    }else {
      console.log(err)
    }
  })
  connection.end();
}

module.exports = {
  insertBlog,
  queryBlog,
  queryBlogByPage
}