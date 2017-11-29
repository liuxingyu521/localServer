var fs = require('fs');
var http = require('http');
var https = require('https');

var express = require('express');
var app = express();

// server端口
var httpPort = 10080;
var httpsPort = 10088;

// 私钥 和 证书文件
var privateKey = fs.readFileSync('./certificate/private.pem', 'utf8');
var certificate = fs.readFileSync('./certificate/custom.crt', 'utf8');
// https-server options
var credentials = {
	key: privateKey,
	cert: certificate
}

// 创建Server
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// 使用server监听端口
httpServer.listen(httpPort, function(){
	console.log('http-server lauched at http://localhost:%s', httpPort);
})
httpsServer.listen(httpsPort, function(){
	console.log('https-server lauched at https://localhost:%s', httpsPort);
})

// 使用express（相当于中间件）处理请求
app.get('/', function(req, res){
	if(req.protocol == 'http'){
		res.status(200);
		res.send('welcome to http server');
	}
	else if(req.protocol == 'https'){
		res.status(200);
		res.send('welcome to https server...');
	}
})

