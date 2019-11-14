const mysql = require('mysql');

function createConnect() {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'nocode',
    database: 'my_blog'
  });
  return connection
}

module.exports = {
  createConnect
}