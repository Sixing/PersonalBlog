const express = require("express");
const cheerio = require('cheerio');
const url = require('url');
const fs = require('fs');
const port = 12306;

const app = new express();

app.use(express.static('./page/'));
// app.get('/getData', (req, res) => {
//   const params = url.parse(req.url, true).query;
//   let data = null;
//   if(params.user == 'sixing') {
//     const cssConent = fs.readFileSync('./page/user1.css');
//     const htmlContent = fs.readFileSync('./page/main1.html')
//     const $ = cheerio.load(htmlContent);
//     $('style').html(cssConent);

//     data = $.html();
//     console.log(data)
//   }else {
//     //data = '/main2.html';
//     data = fs.readFileSync('./page/main2.html')
//   }
//   res.writeHead(200);
//   res.write(data);
//   res.end();

// })

app.listen(port,() => {
  console.log("服务已启动, 端口:" + port);
});