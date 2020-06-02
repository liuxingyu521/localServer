const fs = require('fs');
const https = require('https');
const axios = require('axios');

const express = require('express');
const app = express();

// https-server端口
const httpsPort = 10088;

// 私钥 和 证书文件
const privateKey = fs.readFileSync('./certificate/private.pem', 'utf8');
const certificate = fs.readFileSync('./certificate/custom.crt', 'utf8');
// https-server options
const credentials = {
	key: privateKey,
	cert: certificate
}

// 创建 https-Server
const httpsServer = https.createServer(credentials, app);

// 使用express（相当于中间件）处理请求
app.get('/', function(req, res){
		res.status(200);
		res.send('welcome to https server...');
})

// 代理请求其他接口数据
app.get('/getPersonInfo', function (req, res) {
  axios({
      url: 'https://abc.com/getPersonInfo',
      method: 'get'
    })
    .then(function (response) {
      res.status(200).send(response.data);
    })

})

// 使用server监听端口
httpsServer.listen(httpsPort, function(){
	console.log('https-server lauched at https://localhost:%s', httpsPort);
})
