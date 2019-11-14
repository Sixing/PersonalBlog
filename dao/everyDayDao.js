const dbUtil = require('./dbUtil');


function insertEveryDay(content, ctime, success) {
  const inserSql = "insert into every_day (content, ctime) values (?,?);";
  const params = [content, ctime];

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


function queryEveryDay(success) {
  const querySql = "select * from every_day order by id desc limit 1;";

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
  insertEveryDay,
  queryEveryDay
}