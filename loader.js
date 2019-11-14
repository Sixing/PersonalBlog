const fs = require('fs');
const globalConfig = require('./config');

let controllerSet = [];
let pathMap = new Map();

const files = fs.readdirSync(globalConfig['web_path']);

files.forEach(item => {
  const temp = require(`./${globalConfig["web_path"]}/${item}`)
  if(temp.path) {
    for(const [key, value] of temp.path) {
      if(pathMap.get(key) == null) {
        pathMap.set(key, value)
      }else {
        throw new Error('url path异常，url:' + key)
      }
    }
    controllerSet.push(temp)
  }
})

module.exports = pathMap