var fs = require('fs');
var https = require('https');

var express = require('express');
var app = express();

// https-server端口
var httpsPort = 10088;

// 私钥 和 证书文件
var privateKey = fs.readFileSync('./certificate/private.pem', 'utf8');
var certificate = fs.readFileSync('./certificate/custom.crt', 'utf8');
// https-server options
var credentials = {
	key: privateKey,
	cert: certificate
}

// 创建 https-Server
var httpsServer = https.createServer(credentials, app);

// 使用express（相当于中间件）处理请求
app.get('/', function(req, res){
		res.status(200);
		res.send('welcome to https server...');
})

// 使用server监听端口
httpsServer.listen(httpsPort, function(){
	console.log('https-server lauched at https://localhost:%s', httpsPort);
})