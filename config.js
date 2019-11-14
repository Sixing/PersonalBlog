const fs = require('fs');
const conf = fs.readFileSync('./server.conf');

const configArr = conf.toString().split('\n');
let globalConfig = {};
configArr.forEach(item => {
  globalConfig[item.split('=')[0].trim()] = item.split('=')[1]
})

module.exports = globalConfig
