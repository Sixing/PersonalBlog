let path = new Map();
const everyDayDao = require('../dao/everyDayDao');
const timeUtil = require('../util/timeUtil');
const respUtil = require('../util/respUtil.js')

function editEveryDay(req, res) {
  req.on("data", data => {
    everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(), result => {
      res.writeHead(200);
      res.write(respUtil.writeResult('success', '添加成功', null));
      res.end();
    })
  })
}

function queryEveryDay(req, res) {
  everyDayDao.queryEveryDay(result => {
    res.writeHead(200);
    res.write(respUtil.writeResult('success', '成功', result));
    res.end();
  })
}

path.set('/editEveryDay', editEveryDay);
path.set('/queryEveryDay', queryEveryDay)

module.exports = {
  path
}