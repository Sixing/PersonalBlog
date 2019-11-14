const dbUtil = require('./dbUtil');


function insertTag(tag, ctime, utime, success) {
  const inserSql = "insert into tags (tag, ctime, utime) values (?,?,?);";
  const params = [tag, ctime, utime];
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

function queryTag(tag, success) {
  const querySql = "select * from tags where tag = ?;";
  const params = [tag];
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

module.exports = {
  insertTag,
  queryTag
}